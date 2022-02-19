import dynamic from "next/dynamic";
import { useQuery, gql } from "@apollo/client"
import { useState } from "react";
import { v4 as uuid } from "uuid";
import * as React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Link from 'component/Link';
import { styled } from '@mui/material/styles';

// mui/material
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';

// page layout
import MainLayout from 'layout/MainLayout';

// components
import SummaryCard from "@/cards/SummaryCard";

const fetchUsersQuery = gql`
  {
	users {
      __typename
      id
      fullName
      userImage
      email
      currentPosition
      goal
      dataSources {
        __typename
        id
        name
      }
      areaOfSpecialization {
        __typename
        id
        name
        rating
        skillSets {
          __typename
          id
          name
          experience
          rating
        }
      }
  }
}
`

const NoSSRForceGraph = dynamic(() => import("../../lib/NoSSRForceGraph"), { ssr: false })


const formatData = (data) => {
    const nodes = [];
    const links = [];

    if (!data.users) {
        return { nodes, links };
    }


    data.users.forEach((a) => {
        const a_node = uuid()
        nodes.push({
            id: a_node,
            name: a.fullName,
            email: a.email,
            url: a.userImage,
            __typename: a.__typename,
        });

        a.dataSources.forEach((b) => {
            const b_node = uuid()
            nodes.push({
                id: b_node,
                name: b.name,
                __typename: b.__typename,
            });

            links.push({
                source: b_node,
                target: a_node,
                value: 1,
            });
        });

        a.areaOfSpecialization.forEach((c) => {
            const c_node = uuid()
            nodes.push({
                id: c_node,
                name: c.name,
                rating: c.rating,
                __typename: c.__typename,
            });

            links.push({
                source: c_node,
                target: a_node,
                value: 1,
            });

            c.skillSets.forEach((s) => {
                const s_node = uuid()
                nodes.push({
                    id: s_node,
                    name: s.name,
                    rating: s.rating,
                    experience: s.experience,
                    __typename: s.__typename,
                });

                links.push({
                    source: s_node,
                    target: c_node,
                    value: 0.5,
                });
            })

        });
    });

    return {
        nodes: nodes,
        links,
    };
};

const generateProperty = (node) => {
    const { __typename, __indexColor, fx, fy, color, index, x, y, vx, vy, id, ...rest } = node
    const nnode = rest;
    return { values: Object.keys(nnode).map((key) => [key, nnode[key]]), type: __typename };
}

export default function Explore() {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] })
    const { data } = useQuery(fetchUsersQuery, {
        onCompleted: (data) => setGraphData(formatData(data))
    })

    // variables to control data grid in summaryCard
    const [desc, setDesc] = useState({})
    const [showCard, setShowCard] = useState(false)

    return (
        <React.Fragment>
            <Grid container spacing={6} sx={{ position: 'relative' }} >
                <div >
                    <div style={{
                        position: "absolute",
                        right: -60,
                        top: 52,
                        backgroundColor: "grey", borderRadius: '50%',
                        color: "white",
                        zIndex: 3,
                        display: showCard ? "block" : 'none',
                    }}
                        onClick={(e) => setShowCard(false)}
                    >

                        <IconButton sx={{ color: 'white' }} size="small" aria-label="add to shopping cart">
                            <CancelIcon />
                        </IconButton>
                    </div>
                    <SummaryCard rows={desc} showCard={showCard} />
                </div>
                <Grid item xs={12} md={8} lg={7}>
                    <Box>
                        <NoSSRForceGraph
                            height="1000"
                            width="1200"
                            nodeAutoColorBy={"__typename"}
                            graphData={graphData}
                            linkDirectionalParticles="value"
                            linkDirectionalParticleSpeed={d => d.value * 0.01}
                            onNodeClick={(node) => {
                                console.log(node);
                                setDesc(generateProperty(node))
                                setShowCard(true)
                                // if (node.__typename === "Tag") {

                                // } else if (node.__typename === "Article") {

                                // }
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Explore.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}