import React, { useState } from 'react';
import { NepaliDate } from 'nepali-date';

const CheenaMaker = () => {
  const [formData, setFormData] = useState({
    name: 'deepak',
    fatherName: 'dad',
    motherName: 'mom',
    gotra: 'gotra',
    birthDate: '2004-12-24',
    birthTime: '13:13',
    birthPlace: 'Delhi',
    gender: 'बालक',
    anchal: 'lumbini',
    jilla: 'gulmi',
    gram: 'aapxhaur',
    wardNo: '2'
  });
  //  prompt(new NepaliDate(new Date('2017-01-15'))
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getVal = key => formData[key] || '________';

  // Extract date parts
  const birthDateObj = formData.birthDate ? new Date(formData.birthDate) : null;
  const birthDay = birthDateObj ? birthDateObj.getDate() : '________';
  const birthMonth = birthDateObj ? birthDateObj.getMonth() + 1 : '________';
  const birthYear = birthDateObj ? birthDateObj.getFullYear() : '________';
  const monthNames = [
    'जनवरी',
    'फेब्रुअरी',
    'मार्च',
    'अप्रिल',
    'मे',
    'जुन',
    'जुलाई',
    'अगस्ट',
    'सेप्टेम्बर',
    'अक्टोबर',
    'नोभेम्बर',
    'डिसेम्बर'
  ];

  const birthMonthName = birthDateObj
    ? monthNames[birthDateObj.getMonth()]
    : '________';
  const getAyane = () => {
    if (!birthDateObj) return '________';

    const month = birthDateObj.getMonth(); // 0 = Jan
    const date = birthDateObj.getDate();

    const isAfterJune20 = month > 5 || (month === 5 && date >= 21);
    const isAfterDec20 = month > 11 || (month === 11 && date >= 21);

    if (isAfterJune20 && !isAfterDec20) return 'दक्षिणा';
    return 'उत्तरा';
  };

  const getRitu = () => {
    if (!birthDateObj) return '________';

    const month = birthDateObj.getMonth(); // 0 = Jan

    if (month === 11 || month === 0) return 'शिशिर';
    if (month === 1 || month === 2) return 'वसन्त';
    if (month === 3 || month === 4) return 'ग्रीष्म';
    if (month === 5 || month === 6) return 'वर्षा';
    if (month === 7 || month === 8) return 'शरद';
    if (month === 9 || month === 10) return 'हेमन्त';

    return '________';
  };

  return (
    <div className='bg-base-100 text-base-700 flex flex-col md:flex-row p-5 gap-8'>
      {/* Form Section */}
      <div className='w-full md:w-1/2 space-y-4'>
        <h2 className='text-xl font-semibold'>Cheena Details</h2>
        {[
          { label: 'नाम', name: 'name' },
          { label: 'पिताको नाम', name: 'fatherName' },
          { label: 'आमाको नाम', name: 'motherName' },
          { label: 'गोत्र', name: 'gotra' },
          { label: 'जन्म स्थान', name: 'birthPlace' },
          { label: 'जन्म मिति', name: 'birthDate', type: 'date' },
          { label: 'जन्म समय', name: 'birthTime', type: 'time' },
          { label: 'अञ्चल', name: 'anchal' },
          { label: 'जिल्ला', name: 'jilla' },
          { label: 'ग्राम', name: 'gram' },
          { label: 'वडा नं.', name: 'wardNo' }
        ].map(({ label, name, type = 'text' }) => (
          <div
            key={name}
            className='flex items-center gap-2 '
          >
            <label className='flex-[.2] block text-sm'>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className='flex-[.8] border p-2 rounded w-full bg-base-100 text-base-700'
            />
          </div>
        ))}

        <div className='flex items-center gap-2 '>
          <label className='flex-[.2] block text-sm'>लिङ्ग</label>
          <select
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            className='flex-[.8] border p-2 rounded w-full bg-base-100 text-base-700'
          >
            <option value='बालक'>बालक</option>
            <option value='बालिका'>बालिका</option>
          </select>
        </div>
      </div>

      {/* Cheena Preview */}
      <div className='w-full md:w-1/2 bg-base-100 border border-double border-base-800 shadow-lg rounded-xl p-6 text-justify leading-relaxed whitespace-pre-line'>
        <div className='flex justify-center mb-4'>
          <img
            className='w-[30%] md:w-[20%] lg:w-[15%]'
            src='/lord_ganesha.png'
            alt='Lord Ganesha'
          />
        </div>
        <p className='text-base-700'>
          श्री गणेशाय नमः ।। श्री मंगलमुहुर्तये नमः। श्री ईष्टदेवेभ्यो नमः।
          मातायस्य उमादेवी पिता यस्य तु शंङ्कर । मूषको वाहनो यस्य (
          <span className='text-red-500 font-bold'>सामांपातु</span>) सामांपातु
          विनायकः।। आदित्यादि ग्रहा सर्वे सनक्षेत्र सरासय: ।। दीर्घमायुः
          प्रयच्छन्तु लिखिता जन्म पत्रिका।। श्री शाली वाहनीय शाके _______ श्री
          वीर विक्रमादित्य संवत{' '}
          <span className='text-red-500 font-bold'>{birthYear + 56}</span>{' '}
          ईस्वीयसन् <span className='text-red-500 font-bold'>{birthYear}</span>{' '}
          मास <span className='text-red-500 font-bold'>{birthMonthName}</span>{' '}
          तारिका <span className='text-red-500 font-bold'>{birthDay}</span>{' '}
          श्रीसुर्य <span className='text-red-500 font-bold'>{getAyane()}</span>{' '}
          अयने <span className='text-red-500 font-bold'>{getRitu()}</span> ऋतौ
          _______ मासे ________ पक्षे _______ तिथौ _________ जन्म पुन _________
          नक्षत्रे घटिका _____ पला _______ भभोग _______ घटिका ______ पला ।
          _______ योगे _______ वारे _______लग्ने _______ करणे ________ राशौ
          जन्मः ।। इति पञ्चाङ्ग ।। अथसौरमानेन ________ मासे ________ दिन
          ________ गते ______ वासरे सूर्योदयादृष्टि घटिका _______पला ________ गत
          _________ घटिका _______पला ________ प्रचलित वर्तमान _________ गत
          घंण्टायां ______ बजे ______ मिनेटेषु यवं विधे शुभ कल्याणवती वेलायां
          जात ।। अथ ______ गणे _______ वर्णे ________ वर्गे ______‌योनौ _______
          नाड्याम् श्री नेपालाधिराज्य ________ न‌द्यासमीपे __________
          देवश्चचरणतले{' '}
          <span className='text-red-500 font-semibold'>
            {getVal('anchal')}{' '}
          </span>
          अंचले{' '}
          <span className='text-red-500 font-bold'>{getVal('jilla')}</span>{' '}
          जिल्लायाम्{' '}
          <span className='text-red-500 font-bold'>{getVal('gram')}</span>{' '}
          ग्राह्मे वा.नं.{' '}
          <span className='text-red-500 font-bold'>{getVal('wardNo')}</span>{' '}
          निवसतः श्री{' '}
          <span className='text-red-500 font-bold'>{getVal('gotra')}</span>{' '}
          गोत्रस्य श्रीमत पिता <span className="text-red-500 font-bold">{getVal('fatherName')}</span> तस्यवामाङ्गी श्रीमती{' '}
 <span className="text-red-500 font-bold">  {getVal('motherName')}</span> नाम्नी _______ गर्भ _______ गर्भे‌{' '}
          {formData.gender === 'बालक' ? 'सुपुत्र' : 'सुपुत्री'} जातः || अस्य
          होराशास्त्र प्रमाणोनं _______ देवता _______ नक्षत्रस्य ________
          श्चरणात्वे श्री <span className="text-red-500 font-bold">{getVal('name')}</span> नाम __________ ({formData.gender})
          देवाद्विजा र्सिवादेन दीर्घमायु भूर्यात् ।। अथ अस्य ______ रासे घात
          तिथ्यादय _______ मास _____ | _____ | ____तिथय _____ वार ______
          नक्षेत्र _______ चंद्र मा इतिघातः ।। लोक प्रसिद्ध नामः
        </p>
      </div>
    </div>
  );
};

export default CheenaMaker;
