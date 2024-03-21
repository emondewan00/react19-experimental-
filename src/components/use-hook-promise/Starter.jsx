import { useState, use, Suspense } from "react";
export default function Message() {
  const [show, setShow] = useState(false);
  const [messagePromise, setMessagePromise] = useState(null);

  const handleClick = () => {
    setShow(true);
    setMessagePromise(fetchMessage());
  };

  return show ? (
    <MessageContainer messagePromise={messagePromise} />
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Download message
    </button>
  );
}

const OriginalMessage = ({ messagePromise }) => {
  const data = use(messagePromise);
  return <div>Message is downloaded: {data}</div>;
};

const MessageContainer = ({ messagePromise }) => {
  return (
    <Suspense fallback={<div>Message is downloading...</div>}>
      <OriginalMessage messagePromise={messagePromise} />
    </Suspense>
  );
};

const fetchMessage = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("🚀"), 2000);
  });
};
