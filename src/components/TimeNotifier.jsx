import { useEffect, useState } from 'react';
import NepaliDate from 'nepali-date-converter';
import { useTranslation } from 'react-i18next';

const getTimeOfDay = hours => {
  if (hours >= 4 && hours < 12) return 'बिहान को';
  if (hours >= 12 && hours < 15) return 'दिउँसो को';
  if (hours >= 15 && hours < 20) return 'साँझ को';
  return 'राती को';
};

const getTithi = async date => {
  try {
    const response = await fetch(
      'https://json.freeastrologyapi.com/tithi-durations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'F7YFnQl2777f8cHUFguUZ2rUEF9R4Fal1zr8kH27'
        },
        body: JSON.stringify({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          date: date.getDate(),
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds(),
          latitude: 27.7172,
          longitude: 85.324,
          timezone: 5.75,
          config: {
            observation_point: 'topocentric',
            ayanamsha: 'lahiri'
          }
        })
      }
    );

    const data = await response.json();
    const output = JSON.parse(data.output);
    return output.name || 'Tithi not found';
  } catch (e) {
    console.error('Tithi fetch error:', e);
    return 'Tithi error';
  }
};

const showNotification = async (title, body) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        reg.showNotification(title, {
          body,
          tag: 'time-update',
          renotify: true
        });
      }
    }
  }
};

const TimeNotifier = () => {
  const [lastNotifiedMinute, setLastNotifiedMinute] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const minute = now.getMinutes();

      if (minute === lastNotifiedMinute) return;

      const timeOfDay = getTimeOfDay(now.getHours());
      const timeStr = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const nepaliDate = new NepaliDate(now);
      const formattedNepali = nepaliDate.format('dddd DD MMMM YYYY');
      const tithi = await getTithi(now);

      const title = `${timeOfDay}, ${timeStr}, ${tithi}`;
      const description = formattedNepali;

      await showNotification(title, description);
      setLastNotifiedMinute(minute);
    }, 1000); // every minute

    return () => clearInterval(interval);
  }, [lastNotifiedMinute]);

  const handleTest = async () => {
    const now = new Date();
    const timeOfDay = getTimeOfDay(now.getHours());
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    const nepaliDate = new NepaliDate(now);
    const formattedNepali = nepaliDate.format('dddd DD MMMM YYYY');
    const tithi = await getTithi(now);

    const title = `${timeOfDay}, ${timeStr}, ${tithi}`;
    const description = formattedNepali;

    await showNotification(title, description);
  };

  return null;
};

export default TimeNotifier;

/*
import { useEffect, useState } from 'react';
import NepaliDate from 'nepali-date-converter';
import { useTranslation } from 'react-i18next';

const getTimeOfDayNepali = hours => {
  if (hours >= 4 && hours < 12) return 'बिहान';
  if (hours >= 12 && hours < 15) return 'दिउँसो';
  if (hours >= 15 && hours < 19) return 'साँझ';
  return 'राति';
};

const nepaliTithi = {
  Pratipada: 'प्रतिपदा',
  Dwitiya: 'द्वितीया',
  Tritiya: 'तृतीया',
  Chaturthi: 'चतुर्थी',
  Panchami: 'पंचमी',
  Sasthi: 'षष्ठी',
  Saptami: 'सप्तमी',
  Ashtami: 'अष्टमी',
  Navami: 'नवमी',
  Dashami: 'दशमी',
  Ekadashi: 'एकादशी',
  Dwadashi: 'द्वादशी',
  Trayodashi: 'त्रयोदशी',
  Chaturdashi: 'चतुर्दशी',
  Purnima: 'पूर्णिमा',
  Amavasya: 'औंसी'
};

const getTithi = async date => {
  try {
    const response = await fetch(
      'https://json.freeastrologyapi.com/tithi-durations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'F7YFnQl2777f8cHUFguUZ2rUEF9R4Fal1zr8kH27'
        },
        body: JSON.stringify({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          date: date.getDate(),
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds(),
          latitude: 27.7172,
          longitude: 85.324,
          timezone: 5.75,
          config: {
            observation_point: 'topocentric',
            ayanamsha: 'lahiri'
          }
        })
      }
    );

    const data = await response.json();
    const output = JSON.parse(data.output);
    return nepaliTithi[output.name] || 'तिथि भेटिएन';
  } catch (e) {
    console.error('Tithi fetch error:', e);
    return 'तिथि त्रुटि';
  }
};

const showNotification = async (title, body) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        reg.showNotification(title, {
          body,
          tag: 'time-update',
          renotify: true
        });
      }
    }
  }
};

const TimeNotifier = () => {
  const [lastNotifiedMinute, setLastNotifiedMinute] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const minute = now.getMinutes();

      if (minute === lastNotifiedMinute) return;

      const timeOfDay = getTimeOfDayNepali(now.getHours());
      const timeStr = now.toLocaleTimeString('ne-NP', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const nepaliDate = new NepaliDate(now);
      const formattedNepali = nepaliDate.format('dddd DD MMMM YYYY', {
        language: 'np'
      });
      const tithi = await getTithi(now);

      const title = `${timeOfDay}, ${timeStr}, ${tithi}`;
      const description = formattedNepali;

      await showNotification(title, description);
      setLastNotifiedMinute(minute);
    }, 1000); // every minute

    return () => clearInterval(interval);
  }, [lastNotifiedMinute]);

  const handleTest = async () => {
    const now = new Date();
    const timeOfDay = getTimeOfDayNepali(now.getHours());
    const timeStr = now.toLocaleTimeString('ne-NP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    const nepaliDate = new NepaliDate(now);
    const formattedNepali = nepaliDate.format('dddd DD MMMM YYYY', {
      language: 'np'
    });
    const tithi = await getTithi(now);

    const title = `${timeOfDay}, ${timeStr}, ${tithi}`;
    const description = formattedNepali;

    await showNotification(title, description);
  };

  return null;
};

export default TimeNotifier;
*/
/*
import { useEffect, useState } from 'react';
import NepaliDate from 'nepali-date-converter';

const nepaliTimeOfDay = hours => {
  if (hours >= 4 && hours < 12) return 'बिहान';
  if (hours >= 12 && hours < 15) return 'दिउँसो';
  if (hours >= 15 && hours < 19) return 'साँझ';
  return 'राति';
};

const getNepaliTithi = async date => {
  try {
    const response = await fetch(
      'https://json.freeastrologyapi.com/tithi-durations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'F7YFnQl2777f8cHUFguUZ2rUEF9R4Fal1zr8kH27'
        },
        body: JSON.stringify({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          date: date.getDate(),
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds(),
          latitude: 27.7172,
          longitude: 85.324,
          timezone: 5.75,
          config: {
            observation_point: 'topocentric',
            ayanamsha: 'lahiri'
          }
        })
      }
    );

    const data = await response.json();
    const output = JSON.parse(data.output);
    //Todo Translate tithi name to Nepali
    return output.name || 'तिथि भेटिएन';
  } catch (e) {
    console.error('Tithi fetch error:', e);
    return 'तिथि त्रुटि';
  }
};

const showNotification = async (title, body) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        reg.showNotification(title, {
          body,
          tag: 'time-update',
          renotify: true,
          lang: 'ne' // Specify Nepali language
        });
      }
    }
  }
};

const TimeNotifier = () => {
  const [lastNotifiedMinute, setLastNotifiedMinute] = useState(null);
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const minute = now.getMinutes();

      if (minute === lastNotifiedMinute) return;

      const timeOfDay = nepaliTimeOfDay(now.getHours());
      const timeStr = now.toLocaleTimeString('ne-NP', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const nepaliDate = new NepaliDate(now);
      const formattedNepali = nepaliDate.format('dddd DD MMMM YYYY', {
        language: 'ne'
      });
      const tithi = await getNepaliTithi(now);

      const title = `${timeOfDay}, ${timeStr}, ${tithi}`;
      const description = formattedNepali;

      await showNotification(title, description);
      setLastNotifiedMinute(minute);
    }, 1000); // every minute

    return () => clearInterval(interval);
  }, [lastNotifiedMinute]);

  const handleTest = async () => {
    const now = new Date();
    const timeOfDay = nepaliTimeOfDay(now.getHours());
    const timeStr = now.toLocaleTimeString('ne-NP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    const nepaliDate = new NepaliDate(now);
    const formattedNepali = nepaliDate.format('dddd DD MMMM YYYY', {
      language: 'ne'
    });
    const tithi = await getNepaliTithi(now);

    const title = `${timeOfDay}, ${timeStr}, ${tithi}`;
    const description = formattedNepali;

    await showNotification(title, description);
  };

  return null;
};

export default TimeNotifier;
*/