const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const colors = require('colors')
const passport = require('passport')

const app = express()


const port = process.ENV.PORT || 5000

