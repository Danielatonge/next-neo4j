import dynamic from "next/dynamic";
import { useQuery, gql } from "@apollo/client"
import { useState } from "react";
import _ from "lodash";
import { v4 as uuid } from "uuid";

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

const NoSSRForceGraph = dynamic(() => import("../lib/NoSSRForceGraph"), { ssr: false })

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
        source: a_node,
        target: b_node,
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
        source: a_node,
        target: c_node,
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
          source: c_node,
          target: s_node,
        });
      })

    });
  });

  return {
    nodes: nodes,
    links,
  };
};

export default function Home() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] })
  const { data } = useQuery(fetchUsersQuery, {
    onCompleted: (data) => setGraphData(formatData(data))
  })

  console.log(uuid())
  return (
    <NoSSRForceGraph
      nodeAutoColorBy={"__typename"}
      graphData={graphData}
      onNodeClick={(node, event) => {
        console.log(node);
        // if (node.__typename === "Tag") {

        // } else if (node.__typename === "Article") {

        // }
      }}
    />
  )
}
