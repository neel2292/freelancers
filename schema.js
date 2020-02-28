const graphql = require('graphql'),
    mongo = require('mongoose'),
    model = mongo.model('Freelancers', ),
    Freelancer = require('./models/freelancer'),
    {   GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLList,
        GraphQLNonNull,
        GraphQLInt
    } = graphql,
    FreelancerType = new GraphQLObjectType({
        name: 'freelancers',
        args: {
            offset: {
                type: GraphQLInt
            }
        },
        fields: () => ({
            id: {
                type: GraphQLID
            },
            username : {
                type: GraphQLString
            },
            email : {
                type: GraphQLString
            },
            mobile : {
                type: GraphQLString
            },
            skillsets: {
                type: GraphQLList(GraphQLString)
            },
            hobbies: {
                type: GraphQLList(GraphQLString)
            }
        })
    }),
    RootQuery = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            freelancer: {
                type: FreelancerType,
                args: {
                    id: { type: GraphQLID }
                },
                resolve(parent, args) {
                    return Freelancer.findById(args.id)
                }
            },
            freelancers: {
                type: GraphQLList(FreelancerType),
                resolve(parent, args) {
                    return Freelancer.find({});
                }
            }
        }
    }),
    Mutation = new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            addFreelancer: {
                type: FreelancerType,
                args: {
                    username: {
                        type: GraphQLNonNull(GraphQLString)
                    },
                    email: {
                        type: GraphQLNonNull(GraphQLString)
                    },
                    mobile: {
                        type: GraphQLNonNull(GraphQLString)
                    },
                    skillsets: {
                        type: GraphQLList(GraphQLString)
                    },
                    hobbies: {
                        type: GraphQLList(GraphQLString)
                    }
                },
                resolve(parent, args) {
                    let freelancer = new Freelancer({
                        username: args.username,
                        email: args.email,
                        mobile: args.mobile,
                        skillsets: args.skillsets,
                        hobbies: args.hobbies
                    });

                    return freelancer.save();
                }
            },
            updateFreelancer: {
                type: FreelancerType,
                args: {
                    id: {
                        type: GraphQLID
                    },
                    username: {
                        type: GraphQLString
                    },
                    email: {
                        type: GraphQLString
                    },
                    mobile: {
                        type: GraphQLString
                    },
                    skillsets: {
                        type: GraphQLList(GraphQLString)
                    },
                    hobbies: {
                        type: GraphQLList(GraphQLString)
                    }
                },
                resolve(parent, args) {
                    let freelancer = new Freelancer({
                        username: args.username,
                        email: args.email,
                        mobile: args.mobile,
                        skillsets: args.skillsets,
                        hobbies: args.hobbies
                    });

                    return freelancer.findOne

                    return freelancer.save();
                }
            },
            deleteFreelancer: {
                type: FreelancerType,
                args: {
                    id: {
                        type: GraphQLID
                    }
                },
                resolve(parent, args) {
                    let id = args.id;

                    return freelancer.remove({ _id: id });
                }
            }
        }
    });

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
