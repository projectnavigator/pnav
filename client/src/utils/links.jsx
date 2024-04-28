import React from "react";
import { FaTasks } from "react-icons/fa";
import { IoIosFolderOpen } from "react-icons/io";
import { GiProgression } from "react-icons/gi";
import { BsDatabaseFill } from "react-icons/bs"; //default
import { BsDatabaseFillCheck } from "react-icons/bs"; //existing acc
import { BsDatabaseFillAdd } from "react-icons/bs"; //new acc

const links = [
  {
    text: "Tasks",
    path: ".",
    icon: <FaTasks />,
  },
  {
    text: "Projects",
    path: "dash",
    icon: <IoIosFolderOpen />,
  },
  // {
  //     text: 'PMHome',
  //     path: 'pmhome',
  //     icon: <GoHomeFill />,
  // },
  {
    text: "progress-report",
    path: "progress-report",
    icon: <GiProgression />,
  },
  {
    text: "database",
    path: "database",
    icon: <BsDatabaseFill />,
  },
];

export default links;
