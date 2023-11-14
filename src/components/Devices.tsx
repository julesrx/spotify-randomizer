import { useContext } from "react";

import { DevicesContext } from "~/context";

export default function Devices() {
  const devices = useContext(DevicesContext);
  if (!devices.devices.length)
    return (
      <ul>
        <li>Not devices in use...</li>
      </ul>
    );

  return (
    <ul>
      {devices.devices.map((d) => (
        <li key={d.id}>
          {d.name} ({d.type})
        </li>
      ))}
    </ul>
  );
}
