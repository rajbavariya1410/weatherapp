import { WiDaySunny, WiCloud, WiRain, WiFog, WiSnow } from "react-icons/wi";

export default function WeatherIcon({ desc }) {
  const map = {
    sunny: <WiDaySunny size={95} className="text-yellow-400 drop-shadow-2xl" />,
    clear: <WiDaySunny size={95} className="text-yellow-400 drop-shadow-2xl" />,
    cloudy: <WiCloud size={95} className="text-gray-300 drop-shadow-2xl" />,
    overcast: <WiCloud size={95} className="text-gray-400 drop-shadow-2xl" />,
    rain: <WiRain size={95} className="text-blue-400 drop-shadow-2xl" />,
    fog: <WiFog size={95} className="text-gray-400 drop-shadow-2xl" />,
    snow: <WiSnow size={95} className="text-blue-200 drop-shadow-2xl" />,
  };

  return map[desc] || (
    <WiDaySunny size={95} className="text-orange-300 drop-shadow-2xl" />
  );
}
