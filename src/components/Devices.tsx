import { useContext } from 'react';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

import { DevicesContext } from '~/context';

export default function Devices() {
  const devices = useContext(DevicesContext);
  const current = devices.devices.find((d) => d.is_active);
  const isActive = !!current;

  return (
    <button
      type="button"
      title={current ? current?.name : 'Not devices in use...'}
      className={'w-12 h-12 p-2 rounded-full ' + (isActive ? 'text-spotify-green' : '')}
    >
      <DevicePhoneMobileIcon />
    </button>
  );
}
