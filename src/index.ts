///<reference path="../typings/tsd.d.ts" />
"use strict";
declare var require:any
require('dotenv').config();
import {DiscordBot} from "./Bot";

var bot = new DiscordBot();
//bot.initialize();