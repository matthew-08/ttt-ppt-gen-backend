import express from 'express'
import http from 'http'
import cors from 'cors'
import { Presentation } from 'ts_ppt_text'
import path from 'path'
const app = express()

const pres = new Presentation(path.join(__dirname, 'test.pptx'), __dirname)

app.use(cors()) // Add cors middleware

const server = http.createServer(app)
