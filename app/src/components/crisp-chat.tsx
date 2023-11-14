"use client";

import { useEffect } from "react";

import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("095621d7-3f26-4c6a-b910-e3b6f9eacb48");
    }, []);
    return null;
}; 