import mongoose from "mongoose"

const username = Bun.env.MONGO_USER || 'your-username'
const password = Bun.env.MONGO_PASSWORD || 'your-password'
// const db_name = Bun.env.MONGO_DBNAME || 'tinner_class_example'

// const uri = `mongodb+srv://${username}:${password}@cluster0.zvluv.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`// ของจารย์
//mongodb+srv://thanawathu:<db_password>@cluster0.hfipz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const uri = `mongodb+srv://${username}:${password}@cluster0.hfipz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

export const MongoDB = {
    connect: async function () {
        try {
            await mongoose.connect(uri)
            console.log(' ---- MongoDB Conneted ----')
        } catch (error) {
            console.error(' ---- MongoDB connection error ----')
            console.error(error)
        }
    }
}