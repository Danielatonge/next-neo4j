import { gql, ApolloServer } from "apollo-server-micro"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { Neo4jGraphQL } from "@neo4j/graphql"
import neo4j from "neo4j-driver"

const typeDefs = gql`
type Query {
  employeeCount: Int 
  @auth(rules: [{isAuthenticated: true}]) 
  @cypher(statement: """
    MATCH (u:User)-[:WORKS_IN]->(c:Company) RETURN COUNT(u)
  """)
  employeeRating: [EmployeeRating] 
    @auth(rules: [{isAuthenticated: true}]) 
    @cypher(statement:"""
    match (u:User)<-[:IN_DOMAIN]-(d:Domain) 
    return {id: u.id, rating: avg(toFloat(d.rating))} as obj
   """)
  me: String @cypher(statement:"""
    return $cypherParams.userId  
  """)
}
type EmployeeRating @exclude {
  id: Int
  rating: Float
}

extend type User {
  averageRating: Float @cypher(statement:"""
    match (this)<-[:IN_DOMAIN]-(d:Domain) 
    return avg(toFloat(d.rating))
  """)
}

type User {
  id: ID!
  type: String
  fullName: String
  userName: String
  userImage: String
  email: String
  currentPosition: String
  mentoring: [User]
  goal: String
  tags: [String]
  mentors: [User]
  dataSources: [DataSource] @relationship(type: "CONNECTS_DATA", direction: IN)
  areaOfSpecialization: [Domain] @relationship(type: "IN_DOMAIN", direction: IN)
  messages: [Message] @relationship(type: "MESSAGES", direction: IN)
  posts: [Post] @relationship(type: "WRITES_POST", direction: IN)
  location: Point
  address: String
  city: String
  state: String
  country: String
  company: Company @relationship(type: "IN_COMPANY", direction: OUT)
  createdAt: DateTime
}

type Message {
  id: ID!
  from: User @relationship(type: "MESSAGES", direction: OUT)
  chatHistory: [MessageItem]
}

type MessageItem {
  id: ID!
  content: String
  createdAt: DateTime
  updatedAt: DateTime
}

type DataSource {
  id: ID!
  name: String
  link: String
  user: User @relationship(type: "CONNECTS_DATA", direction: OUT)
}

type Domain {
  id: ID!
  name: String
  similar: [String]
  description: String
  skillSets: [SkillSet] @relationship(type: "HAS_SKILLSET", direction: IN)
  rating: Float
  experience: Float
  user: User @relationship(type: "IN_DOMAIN", direction: OUT)
}

type SkillSet {
  id: ID!
  name: String!
  type: String
  rating: Float
  experience: Float
  domain: Domain @relationship(type: "HAS_SKILLSET", direction: OUT)
}

type Post {
  id: ID!
  content: String
  extraContent: String
  postMedia: [String]
  links: String
  likes: [User]
  user: User @relationship(type: "WRITES_POST", direction: OUT)
  comments: [Comment] @relationship(type: "HAS_COMMENT", direction: IN)
  createdAt: DateTime
  updatedAt: DateTime
}

type Comment {
  id: ID!
  user: User 
  content: String
  likes: [User]
  post: Post @relationship(type: "HAS_COMMENT", direction: OUT)
  createdAt: DateTime
  updatedAt: DateTime
}

type Company {
  id: ID!
  name: String
  city: String
  state: String
  country: String
  address: String
  location: Point
  employees: [User] @relationship(type: "IN_COMPANY", direction: IN)
}

`

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
)

const neoSchema = new Neo4jGraphQL({ typeDefs, driver })

const apolloServer = new ApolloServer({
    schema: neoSchema.schema,
    playground: true,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
})

const startServer = apolloServer.start()

export default async function handler(req, res) {
    await startServer;

    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
}

export const config = {
    api: {
        bodyParser: false
    }
}
