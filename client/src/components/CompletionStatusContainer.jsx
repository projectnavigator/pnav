import { MdPendingActions, MdOutlineCancel } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";

import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const CompletionStatusContainer = ({ defaultCompletionStats }) => {
  const stats = [
    {
      title: "pending projects",
      count: defaultCompletionStats?.pending || 0,
      icon: <MdPendingActions />,
      bcg: "#e7e7e7",
      color: "#888683"
    },
    {
      title: "done projects",
      count: defaultCompletionStats?.done || 0,
      icon: <IoCheckmarkDoneCircleOutline />,
      color: "#70cb64",
      bcg: "#e1f9e0",
    },
    {
      title: "in progress projects",
      count: defaultCompletionStats?.in_progress || 0,
      icon: <GiProgression />,
      color: "#64aecb",
      bcg: "#e0f0f9",
    },
    {
      title: "cancelled projects",
      count: defaultCompletionStats?.cancelled || 0,
      icon: <MdOutlineCancel />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  )
};

export default CompletionStatusContainer;
