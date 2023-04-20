import { SetStateAction, useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  FormControl,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { supabase } from "../app/supabaseClient";
import { useAppSelector } from "../app/hooks";
import { IoSend } from "react-icons/io5";
interface room {
  id: string;
  created_at: Date;
  name: string;
  owner: string;
}

type message = {
  sender: string;
  message: string;
};
export function RoomList() {
  const user = useAppSelector((state) => state.user);
  const chat = useRef<HTMLDivElement>(null);
  const [currentRoom, setCurrentRoom] = useState<room | null>(null);
  const [channel, setChannel] = useState<any>();
  const [messages, setMessages] = useState<message[]>([]);
  const { register: joinRegister, handleSubmit: handleJoin } = useForm<any>();
  const { register: createRegister, handleSubmit: handleCreate } =
    useForm<any>();
  const { register: messageRegister, handleSubmit: handleMessage } =
    useForm<any>();

  async function createRoom(name: string) {
    try {
      const { data, error } = await supabase.rpc("create_room", {
        room_name: name,
      });
      if (error) {
        throw error;
      }
      joinRoom(data[0].id);
    } catch (error) {
      console.error(error);
    }
  }

  async function joinRoom(id: string) {
    try {
      const { data, error } = await supabase.rpc("get_room_by_id", {
        room_id: id,
      });
      if (error) {
        throw error;
      }
      setCurrentRoom(data[0]);
      setChannel(
        supabase.channel(`room:${data[0].id}`, {
          config: {
            presence: { key: user.id },
          },
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function leaveRoom() {
    if (currentRoom?.owner === user.id && currentRoom) {
      await supabase.rpc("delete_room", { room_id: currentRoom.id });
    }
    setCurrentRoom(null);
  }

  function handleGetMessages(event: any) {
    let newPayload = event.payload;
    setMessages((messages) => [...messages, newPayload]);
  }

  // function to auto scroll to bottom of chat
  function scrollToBottom() {
    if (chat.current) {
      chat.current.scrollTop = chat.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (channel) {
      // Check if already subscribed
      if (channel.hasChannel) {
        return;
      }
      channel
        .on("presence", { event: "sync" }, () => {
          const state = channel.presenceState();
          console.log(state);
        })
        .on(
          "broadcast",
          { event: "message" },
          async (event: {
            event: any;
            payload: {
              sender: string;
              message: string;
            };
          }) => {
            handleGetMessages(event);
          }
        )
        .subscribe();
    }
  }, [channel]);

  return (
    <>
      <Container>
        <Row>
          {!currentRoom ? (
            <>
              <Col md={12} className="mb-2">
                <Card>
                  <Card.Body>
                    <Card.Title>Join Room</Card.Title>
                    <Form
                      key={1}
                      onSubmit={handleJoin((data: FieldValues) =>
                        joinRoom(data.room)
                      )}
                    >
                      <FormControl
                        type="text"
                        placeholder="Room ID"
                        className="mb-3"
                        {...joinRegister("room", { required: true })}
                      />
                      <Button type="submit" variant="primary">
                        Join
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>Create Room</Card.Title>
                    <Form
                      key={2}
                      onSubmit={handleCreate((data: FieldValues) =>
                        createRoom(data.roomName)
                      )}
                    >
                      <FormControl
                        type="text"
                        placeholder="Room Name"
                        className="mb-3"
                        {...createRegister("roomName", { required: true })}
                      />
                      <Button type="submit" variant="success">
                        Create
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </>
          ) : (
            <>
              <Col md={12} className="mb-2">
                <Card>
                  <Card.Body>
                    <Card.Title>Current Room</Card.Title>
                    <p>Current Room ID : {currentRoom.id}</p>
                    <p>Current Room Name : {currentRoom.name}</p>
                    <Button variant="danger" onClick={leaveRoom}>
                      Leave
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12}>
                <Card>
                  <Card.Header>Chat</Card.Header>
                  <Card.Body
                    className="text-start"
                    style={{
                      maxHeight: "600px",
                      overflowY: "auto",
                      overflowX: "auto",
                    }}
                    ref={chat}
                  >
                    {messages.length > 0 ? (
                      messages.map((message, index) => (
                        <p key={index}>
                          👤 <strong>{message.sender}</strong> :{" "}
                          {message.message}
                        </p>
                      ))
                    ) : (
                      <p>No messages</p>
                    )}
                  </Card.Body>
                  <Card.Footer>
                    <Form
                      key={3}
                      onSubmit={handleMessage((data: FieldValues) => {
                        channel.send({
                          type: "broadcast",
                          event: "message",
                          payload: { sender: user.name, message: data.message },
                        });
                        setMessages([
                          ...messages,
                          { sender: user.name!, message: data.message },
                        ]);
                      })}
                    >
                      <InputGroup>
                        <Form.Control
                          placeholder="Message"
                          {...messageRegister("message", { required: true })}
                        />
                        <Button variant="primary" type="submit">
                          <IoSend />
                        </Button>
                      </InputGroup>
                    </Form>
                  </Card.Footer>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
}
