import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RepositoryQuery{
    data:{
        search: {
            repositoryCount: number;
            edges: Array<{
              cursor: string;
              node: {
                id: string;
                name: string;
                description?: string;
                url: string;
                primaryLanguage?: { name: string };
                owner: { login: string };
                updatedAt: string;
              };
            }>;
            pageInfo: {
              endCursor: string;
              startCursor: string;
              hasNextPage: boolean;
            };
          };
    }
  }


export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/graphql'
    }),
    endpoints: (builder)=>({
        getRepositories: builder.query<RepositoryQuery, {searchQuery:string, endCursor:string, repNumber:number}>({
            query: ({searchQuery, endCursor, repNumber}) => ({
                url: '',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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'
                },
                body: JSON.stringify({
                    query:`
                    query SearchRepositories($searchQuery: String!, $endCursor: String!, $repNumber: Int){
                        search(query: $searchQuery, type: REPOSITORY, first: $repNumber, after: $endCursor) {
                            repositoryCount
                            edges {
                                node {
                                    ... on Repository {
                                        id
                                        name
                                        description
                                        url
                                        primaryLanguage {
                                            name
                                        }
                                        owner {
                                            login
                                        }
                                        updatedAt
                                    }
                                }
                            }
                            pageInfo {
                                endCursor
                                startCursor
                                hasNextPage
                            }
                        }
                    }
                `,
                variables:{ searchQuery, endCursor, repNumber},
                })
            })
        })
    }) 
})

export const {useLazyGetRepositoriesQuery} = baseApi