import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

interface Student {
  _id: string;
  user_id: string;
  user_input: string;
  botResponse: string;
  timeStamp: string;
}

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


const Past: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const { userId } = useAuth();
  console.log('Auth token:', userId);

  useEffect(() => {
    const fetchData = async () => {
      try {

        var raw = JSON.stringify({
          "user_id": userId
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3001/fetchDB", requestOptions)
          .then(response => response.text())
          .then(result => setStudents(JSON.parse(result)))
          .catch(error => console.log('error', error))

        // const response = await axios.post('/fetchDB', { userId });
        // console.log('Response data:', response.data);
        //setStudents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]); // Include userId as a dependency to re-fetch data when the user changes

  // Filter students based on the current user_id
  //const filteredStudents = students.filter(student => student.user_id === userId);

  return (
      <div className="pastChatContainer mx-auto max-w-[1000px] bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <h1 className="chatTitle white font-bold">Past Chats</h1>
        <ul className="chatList">
          {students.map((s) => (
            <li key={s._id} className="chatListItem">
              <p className="userInput"><strong>User Input:</strong> {s.user_input}
              </p>
              <p className="botResponse"><strong>Bot Response:</strong> {s.botResponse}</p>
              <p className="timestamp"><strong>Timestamp:</strong> {s.timeStamp}</p>
            </li>
          ))}
        </ul>
      </div>

  );
};


export default Past;
