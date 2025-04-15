import React, { useState } from "react";

const CheenaMaker = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    gotra: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    gender: "बालक",
    anchal: "",
    jilla: "",
    gram: "",
    wardNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getVal = (key) => formData[key] || "________";

  return (
    <div className="bg-white text-black flex flex-col md:flex-row p-5 gap-8">
      {/* Form Section */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-xl font-semibold">Cheena Details</h2>
        {[
          { label: "नाम", name: "name" },
          { label: "पिताको नाम", name: "fatherName" },
          { label: "आमाको नाम", name: "motherName" },
          { label: "गोत्र", name: "gotra" },
          { label: "जन्म स्थान", name: "birthPlace" },
          { label: "जन्म मिति", name: "birthDate", type: "date" },
          { label: "जन्म समय", name: "birthTime", type: "time" },
          { label: "अञ्चल", name: "anchal" },
          { label: "जिल्ला", name: "jilla" },
          { label: "ग्राम", name: "gram" },
          { label: "वडा नं.", name: "wardNo" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="border p-2 rounded w-full bg-zinc-100 text-black"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm">लिङ्ग</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-zinc-100 text-black"
          >
            <option value="बालक">बालक</option>
            <option value="बालिका">बालिका</option>
          </select>
        </div>
      </div>

      {/* Cheena Preview */}
      <div className="w-full md:w-1/2 bg-white border border-red-600 shadow-lg rounded-xl p-6 text-justify leading-relaxed whitespace-pre-line">
        <div className="flex justify-center mb-4">
          <img
            className="w-[30%] md:w-[20%] lg:w-[15%]"
            src="/lord_ganesha.png"
            alt="Lord Ganesha"
          />
        </div>
        <p className="text-black">
          श्री गणेशाय नमः ।। श्री मंगलमुहुर्तये नमः। श्री ईष्टदेवेभ्यो नमः।
          मातायस्य {getVal("motherName")} पिता यस्य तु {getVal("fatherName")} ।
          मूषको वाहनो यस्य {getVal("name")} सामांपातु विनायकः।। आदित्यादि ग्रहा
          सर्वे सनक्षेत्र सरासय: ।। दीर्घमायुः प्रयच्छन्तु लिखिता जन्म पत्रिका।।
          श्री शाली वाहनीय शाके _______ श्री वीर विक्रमादित्य संवत _______
          ईस्वीयसन् ________ ईस्वीय मास ________ तारिका _______ श्रीसुर्य
          ________ अयने _________ ऋतौ _______ मासे ________ पक्षे _______ तिथौ
          _________ जन्म पुन _________ नक्षत्रे घटिका _____ पला _______ भभोग
          _______ घटिका ______ पला । _______ योगे _______ वारे _______लग्ने
          _______ करणे ________ राशौ जन्मः ।। इति पञ्चाङ्ग ।। अथसौरमानेन
          ________ मासे ________ दिन ________ गते ______ वासरे सूर्योदयादृष्टि
          घटिका _______पला ________ गत _________ घटिका _______पला ________
          प्रचलित वर्तमान _________ गत घंण्टायां ______ बजे ______ मिनेटेषु यवं
          विधे शुभ कल्याणवती वेलायां जात ।। अथ ______ गणे _______ वर्णे ________
          वर्गे ______‌योनौ _______ नाड्याम् श्री नेपालाधिराज्य ________
          न‌द्यासमीपे __________ देवश्चचरणतले ___________ अंचले{" "}
          {getVal("anchal")} जिल्लायाम् {getVal("jilla")} ग्राह्मे वा.नं.{" "}
          {getVal("wardNo")}
          निवसतः श्री {getVal("gotra")} गोत्रस्य श्रीमत पिता{" "}
          {getVal("fatherName")} तस्यवामाङ्गी श्रीमती {getVal("motherName")}{" "}
          नाम्नी _______ गर्भ _______ गर्भे‌{" "}
          {formData.gender === "बालक" ? "सुपुत्र" : "सुपुत्री"} जातः || अस्य
          होराशास्त्र प्रमाणोनं _______ देवता _______ नक्षत्रस्य ________
          श्चरणात्वे श्री {getVal("name")} नाम __________ ({formData.gender})
          देवाद्विजा र्सिवादेन दीर्घमायु भूर्यात् ।। अथ अस्य ______ रासे घात
          तिथ्यादय _______ मास _____ | _____ | ____तिथय _____ वार ______
          नक्षेत्र _______ चंद्रमा इतिघातः ।। लोक प्रसिद्ध नामः
        </p>
      </div>
    </div>
  );
};

export default CheenaMaker;
