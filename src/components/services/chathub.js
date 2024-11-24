import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
export function MyChatHub() {


  const [connection, setConnection] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const handleChat = async () => {
    if (connection && inputMessage) {
      try {
        await connection.invoke("SendMessage", inputMessage);
        setInputMessage(""); // Clear the input field after sending
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  };



  
  useEffect(() => {
    // Set up SignalR connection when the component mounts
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7098/chatHub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => console.log("Connected to SignalR hub"))
      .catch((err) => console.error("Error connecting to hub:", err));

    newConnection.on("ReceiveMessage", (message) => {
      setInputMessage((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Clean up the connection when the component unmounts
      newConnection
        .stop()
        .then(() => console.log("Disconnected from SignalR hub"));
    };
  }, []);

  return (
    <>
      <TextField value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
      <Button variant="contained" onClick={handleChat}>
        Send
      </Button>
      <div>
      <ul id="discussion">
            {inputMessage.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
      </div>
    </>
  );
}
