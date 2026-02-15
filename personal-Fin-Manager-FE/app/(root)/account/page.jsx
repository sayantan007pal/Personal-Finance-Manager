"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";




  const ACCOUNT_TYPE = ["SAVINGS", "CURRENT", "CREDIT_CARD", "LOAN", "OTHER"]