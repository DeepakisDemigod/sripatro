/*import { useEffect } from 'react';

const TimeNotifier = () => {
  // Ask for permission on load
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  // Function to show notification via service worker
  const showNotification = async (title, body) => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.showNotification(title, {
          body,
          tag: 'time-update',
          renotify: true
        });
      }
    }
  };

  // Send notification every minute
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const interval = setInterval(() => {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        showNotification(
          'Time Update jsj',
          `${date} - ${time} We are a UK-based publisher producing educational posters suitable for wall space at home, work or places of study. Allcharts themed educational wallcharts are for anyone who loves discovery. Spanning the arts, sciences, culture and politics, they celebrate humanity’s most accomplished achievers, introducing their stories in an accessible format. We create visually engaging classroom posters that spark curiosity and inspire future pioneers, innovators and adventurers.`
        );
      }, 60000); // every 1 min

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <p>
      Time Notifier{' '}
      <button
        className='btn'
        onClick={() => {
          const now = new Date();
          showNotification('MidDay', `${now.toLocaleTimeString()}`);
        }}
      >
        Test Notification
      </button>
    </p>
  );
};

export default TimeNotifier;
*/

/*
import { useEffect, useState } from 'react';
import NepaliDate from 'nepali-date-converter';

const getTimeOfDay = hours => {
  if (hours >= 4 && hours < 12) return 'Morning';
  if (hours >= 12 && hours < 15) return 'Noon';
  if (hours >= 15 && hours < 19) return 'Evening';
  return 'Night';
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
    console.log(data);
    return data.name || '';
  } catch (e) {
    console.error('Tithi fetch error:', e);
    return '';
  }
};

const showNotification = async (title, body) => {
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
};

const TimeNotifier = () => {
  const [lastNotified, setLastNotified] = useState(null);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const currentMinute = now.getMinutes();

      // Avoid notifying multiple times a minute
      if (lastNotified === currentMinute) return;

      const timeOfDay = getTimeOfDay(now.getHours());
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const nepaliDate = new NepaliDate(now);
      const tithi = await getTithi(now);

      const title = `${timeOfDay}, ${formattedTime}`;
      const description = `(${tithi}), ${nepaliDate.format(
        'dddd DD MMMM YYYY'
      )}`;

      await showNotification(title, description);
      setLastNotified(currentMinute);
    }, 15000); // check every 15 seconds

    return () => clearInterval(interval);
  }, [lastNotified]);

  return (
    <p>
      Time Notifier{' '}
      <button
        className='btn'
        onClick={async () => {
          const now = new Date();
          const timeOfDay = getTimeOfDay(now.getHours());
          const formattedTime = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
          const nepaliDate = new NepaliDate(now);
          const tithi = await getTithi(now);

          const title = `${timeOfDay}, ${formattedTime}`;
          const description = `(${tithi}), ${nepaliDate.format(
            'dddd DD MMMM YYYY'
          )}`;

          await showNotification(title, description);
        }}
      >
        Test Notification
      </button>
    </p>
  );
};

export default TimeNotifier;
*/

/*
import { useEffect, useState } from 'react';
import NepaliDate from 'nepali-date-converter';

const getTimeOfDay = hours => {
  if (hours >= 4 && hours < 12) return 'Morning';
  if (hours >= 12 && hours < 15) return 'Noon';
  if (hours >= 15 && hours < 19) return 'Evening';
  return 'Night';
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

      const title = `${timeOfDay}, ${timeStr}`;
      const description = `(${tithi}), ${formattedNepali}`;

      await showNotification(title, description);
      setLastNotifiedMinute(minute);
    }, 1000); // every 1  min

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
    const description = `${formattedNepali}`;

    await showNotification(title, description);
  };

  return (
    <div>
      <p>Time Notifier</p>
      <button
        className='btn'
        onClick={handleTest}
      >
        Test Notification
      </button>
    </div>
  );
};

export default TimeNotifier;
*/

import { useEffect, useState } from 'react';
import NepaliDate from 'nepali-date-converter';

const getTimeOfDay = hours => {
  if (hours >= 4 && hours < 12) return 'Morning';
  if (hours >= 12 && hours < 15) return 'Noon';
  if (hours >= 15 && hours < 19) return 'Evening';
  return 'Night';
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
    }, 1000); // every 15 seconds

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
