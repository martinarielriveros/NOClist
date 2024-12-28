import mongoose from "mongoose";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: Object.values(LogSeverityLevel),
    default: "low",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const logModel = mongoose.model("Log", logSchema);
