import React, {useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {GET_MESSAGES} from '../../utils/api/messageApi';
import {GET_USER} from '../../utils/api/userApi';
import {Message as MessageType} from '../../utils/Types';
import Message from './Message';
import Loader from '../../components/Loader';

interface IProps {
  id: string
}

const Messages: React.FC<IProps> = ({id}) => {
  const {data: messages, startPolling, stopPolling} = useQuery(GET_MESSAGES, {variables: {id}});
  const {data: currentUser} = useQuery(GET_USER);
  const {data: user} = useQuery(GET_USER, {variables: {id}});

  useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    }
  }, []);

  if (!messages || !user || !currentUser) {
    return <Loader open={true} />;
  }

  return (
    <>
      {messages.messages.map((message: MessageType) => {
        const isIncoming = message.from === id;

        return <Message
          key={Math.random()}
          isIncoming={isIncoming}
          text={message.text}
          avatar={isIncoming ? user.user.avatar : currentUser.user.avatar}/>
      })}
    </>
  );
}

export default Messages;