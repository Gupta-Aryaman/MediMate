'use client'
import { useState, useEffect } from "react";
import React from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { axios } from "axios";
import TypingAnimation from "@/components/TypingAnimation";
import { useAuth } from "@clerk/nextjs";
import { NextResponse } from 'next/server';

// const tools = [
//     {
//         label: 'Account',
//         icon: MessageSquare,
//         color: 'text-blue-500',
//         bgColor: 'bg-violet-500/10',
//         href: '/dashboard'
//     },
//     {
//         label: 'Account',
//         icon: MessageSquare,
//         color: 'text-blue-500',
//         bgColor: 'bg-violet-500/10',
//         href: '/dashboard'
//     },
// ]

export default function DashboardPage() {
    const [inputValue, setInputValue] = useState('');
    const [chatLog, setChatLog] = useState([]); // [ { message: 'hello', from: 'user' } ]
    const [isloading, setIsLoading] = useState(false);

    const { isLoaded, isSignedIn, userId } = useAuth();
    //console.log(userId);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    //  function to simulate the chatbot API
    const mockChatbotAPI = async (query) => {
    switch (query.toLowerCase()) {
      case 'hello':
        return { response: "As a helpful, respectful, honest, and knowledgeable health assistant, I will do my best to provide you with possible reasons for your symptoms based on the information you have provided. However, please note that a proper medical diagnosis can only be made by a qualified healthcare professional after a thorough examination and appropriate testing. Based on your symptoms, here are some possible explanations: \n1. Pregnancy: As you mentioned, pregnancy is a common cause of amenorrhea (missed periods), and it is important to consider this possibility if you are sexually active and have not used any form of birth control. However, given your age and the duration of your symptoms, pregnancy may not be the most likely explanation."
         };
      case 'how are you':
        return { response: 'I\'m just a computer program, but I\'m doing well! How about you?' };
      // Add more cases as needed
      default:
        return { response: 'I\'m sorry, I didn\'t understand that.' };
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Check if inputValue is empty
        if (!inputValue.trim()) {
            return;
        }
        
        setChatLog((prevChatLog) => [...prevChatLog, { type: "user", message: inputValue }]);
        setInputValue('');
        // var requestOptions = {
        //     method: 'GET',
        //     redirect: 'follow'
        // };
    
        // fetch(`http://127.0.0.1:5000/chat?query=${inputValue}`, requestOptions)
        //     .then(response => response.json())
        mockChatbotAPI(inputValue)
            .then(result => {
                if ("response" in result) {
                    const botResponse = result.response; // getting the response from the bot
                    const formattedResponse = botResponse.replace(/\n/g, '<br>');
                    // updating the chat response
                    setChatLog(prevChatLog => [...prevChatLog, { type: 'bot', message: formattedResponse }]);
                    setInputValue('');
                    
                    var raw = JSON.stringify({
                        "user_id": userId,
                        "user_input": inputValue,
                        "bot_response": botResponse,
                        "timestamp": Date.now()
                        });
                    
                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };
                    
                    fetch("http://localhost:3001/saveDB", requestOptions)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
                        
                    

                } else {
                    console.log("Answer not found. Apologies!");
                }
            })
            .catch(error => console.log('error', error));



            console.log("reached here");
            
    };

    const handleClearHistory = () => {
        // Send a request to clear the chatbot's memory
        fetch("http://127.0.0.1:5000/clear_memory", { method: 'POST' })
            .then(response => response.json())
            .then(result => {
                console.log("Memory cleared:", result);
                // Optionally, update your UI or take other actions
            })
            .catch(error => console.error('Error clearing memory:', error));
    };

    const sendMessage =  (message) => {
        const url = ""
        const headers = {  
            "Content-Type": "application/json",

        };

        sendMessage(inputValue);

        setIsLoading(true);
        axios.post(url, data, { headers : headers }).then((response) => {
            console.log(response);
            setChatLog((prevChatLog) => [...prevChatLog, { type: "bot", message: response.data }]);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        });

    }
    return (
        <div>
            <div >
                {/* <h2 className="text-4xl md:text-4xl font-bold text-center">
                    Dashboard
                </h2> */}
                {/* <p className="text-muted-foreground font-light text-sm md:text-lg text-center">Manage your account</p> */}
            </div>
            {/* <div className="px-4 md:px-20 lg:px-20 space-y-4">
                {tools.map((tool) => (
                    <Card 
                    key={tool.href}
                    className="p-4 border-clack/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
                        <div className="flex items-center gap-x-4">
                            <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                                <tool.icon className={cn('w-8 h-8', tool.color)} /> 
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5" />
                    </Card>
                ))}
            </div> */}
            <div className="container mx-auto max-w-[1000px] py-7" >
                <div className="flex flex-col h-screen bg-gray-900 border border-gray-700 rounded-lg" style={{ maxHeight: '600px' }}>
                    <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg px-3 text-3xl text-white">
                    Ask Your Questions
                    </h1>
                <div className="flex-grow p-6 overflow-y-auto" style={{ maxHeight: '450px' }}>
                    {chatLog.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`${message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'} rounded-mlg p-4 text-white max-w-sm rounded-lg`}
                            style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}
                            dangerouslySetInnerHTML={{ __html: message.message }}
                            />
                        </div>
                    ))}
                    {isloading && (
                        <div key={chatLog.length} className="flex justify-start">
                            <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm rounded-lg">
                            Typing...
                            </div>
                        </div>
                            )}
                </div>
                <form onSubmit={handleSubmit} className="flex-none p-6">
                    <div className="flex rounded-lg border border-gray-700 bg-gray-700">
                    <input type="text" placeholder="Type Your message" onChange={(e) => setInputValue(e.target.value)} className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none" />
                    <button type="submit" className="bg-purple-500 rounded-lg px-4 py=2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300">Send</button>
                    </div>
                </form>
                <button onClick={handleClearHistory} className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
                Clear History
            </button>
            </div>
        </div>
    </div>
);
}