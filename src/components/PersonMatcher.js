"use client";
import React, { useState, useEffect } from "react";
import { AutoComplete, Spin, Image, Button } from "antd";
import Confetti from "react-confetti";

// Embedded data for boys and girls
const boys = [
  { id: 1, name: "Abhishek Shau", image: "/boy.png" },
  { id: 2, name: "Akash Biswas", image: "/boy.png" },
  { id: 3, name: "Ankur Sarkar", image: "/boy.png" },
  { id: 4, name: "Arnab Majumder", image: "/boy.png" },
  { id: 5, name: "Avirup Chakravorty", image: "/boy.png" },
  { id: 6, name: "Debarjun Debnath", image: "/boy.png" },
  { id: 7, name: "Debashis Saha", image: "/boy.png" },
  { id: 8, name: "Krishnendu Mondol", image: "/boy.png" },
  { id: 9, name: "Liton Dutta", image: "/boy.png" },
  { id: 10, name: "Mrinal Kanti Mondol", image: "/boy.png" },
  { id: 11, name: "Pritam Palit", image: "/boy.png" },
  { id: 12, name: "Rahul Mondol", image: "/boy.png" },
  { id: 13, name: "Raj Shaw", image: "/boy.png" },
  { id: 14, name: "Rakesh Dey", image: "/boy.png" },
  { id: 15, name: "Ritesh Das", image: "/boy.png" },
  { id: 16, name: "Ritesh Sarkar", image: "/boy.png" },
  { id: 17, name: "Rohan Chowdhury", image: "/boy.png" },
  { id: 18, name: "Rohan Debnath", image: "/boy.png" },
  { id: 19, name: "Sachin Dhuriya", image: "/boy.png" },
  { id: 20, name: "Sagar Das", image: "/boy.png" },
  { id: 21, name: "Samrat Dutta", image: "/boy.png" },
  { id: 22, name: "Sayan Mondol", image: "/boy.png" },
  { id: 23, name: "Soumyadip Ghosh", image: "/boy.png" },
  { id: 24, name: "Soumik Sarkar", image: "/boy.png" },
  { id: 25, name: "Soutik Bera", image: "/boy.png" },
  { id: 26, name: "Srijoy Bhattacharya", image: "/boy.png" },
  { id: 27, name: "Swarnavo Chatterjee", image: "/boy.png" },
  { id: 28, name: "Tanmoy Bera", image: "/boy.png" },
  { id: 29, name: "Tanutra Jana", image: "/boy.png" },
  { id: 30, name: "Tapas Mondol", image: "/boy.png" },
  { id: 31, name: "Ujjwal Kumar", image: "/boy.png" },
  { id: 32, name: "Vimal Anand", image: "/boy.png" },
  { id: 33, name: "Anirban Biswas", image: "/boy.png" },
  { id: 34, name: "Arka Chakraborty", image: "/boy.png" },
  { id: 35, name: "Arnab Adhikary", image: "/boy.png" },
  { id: 36, name: "Tanmoy Ghosh", image: "/boy.png" },
];

const girls = [
  { id: 1, name: "Anwesha Biswas", image: "/girl.png" },
  { id: 2, name: "Bhabna Roy", image: "/girl.png" },
  { id: 3, name: "Heena Patel", image: "/girl.png" },
  { id: 4, name: "Ishpita Roy", image: "/girl.png" },
  { id: 5, name: "Oishi Bose", image: "/girl.png" },
  { id: 6, name: "Papiya Paul", image: "/girl.png" },
  { id: 7, name: "Riya Karmakar", image: "/girl.png" },
  { id: 8, name: "Sneha Singh", image: "/girl.png" },
  { id: 9, name: "Zia Tasneem", image: "/girl.png" },
  { id: 10, name: "Aditi Chowdhury", image: "/girl.png" },
  { id: 11, name: "Priya Paul", image: "/girl.png" },
  { id: 12, name: "Shraya Kundu", image: "/girl.png" },
  { id: 13, name: "Sriparna Chowdhury", image: "/girl.png" },
];

const backgroundImages = [
  "/bg1.jpg",
  "/bg2.jpg",
  "/bg3.jpg",
  "/bg4.jpg",
  "/bg5.jpg",
];

const PersonMatcher = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [matched, setMatched] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((currentBackground + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentBackground]);

  useEffect(() => {
    const searchResults = [...boys, ...girls].filter((person) =>
      person.name.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(searchResults);
  }, [input]);

  const onSelect = (value, option) => {
    setLoading(true);
    const person = boys.concat(girls).find((p) => p.name === value);
    setSelectedPerson(person);
    setTimeout(() => {
      const possiblePartners = person
        ? boys.includes(person)
          ? girls
          : boys
        : [];
      const randomPartner =
        possiblePartners[Math.floor(Math.random() * possiblePartners.length)];
      setPartner(randomPartner);
      setLoading(false);
      setShowConfetti(true);
      setMatched(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }, 1500);
  };

  const resetMatcher = () => {
    setMatched(false);
    setSelectedPerson(null);
    setPartner(null);
    setInput("");
  };

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImages[currentBackground]})` }}
    >
      <div className="overlay">
        <div
          className="matcher-container"
          style={{ background: "none", width: "70%" }}
        >
          {!matched && (
            <>
              <h2 className="title">Enter a name to find a match:</h2>
              <AutoComplete
                style={{ width: 300 }}
                onSearch={setInput}
                onSelect={onSelect}
                options={suggestions.map((person) => ({
                  value: person.name,
                  label: person.name,
                  gender: boys.includes(person) ? "boy" : "girl",
                }))}
                placeholder="Type a name"
              />
            </>
          )}
          {loading && <Spin size="large" />}
          {!loading && matched && (
            <>
              <div className="profiles">
                <div>
                  <Image
                    width={200}
                    src={selectedPerson.image}
                    alt={selectedPerson.name}
                  />
                  <h3>{selectedPerson.name}</h3>
                </div>
                <div>
                  <Image width={200} src={partner.image} alt={partner.name} />
                  <h3>{partner.name}</h3>
                </div>
              </div>
              <Button type="primary" onClick={resetMatcher}>
                Try Again
              </Button>
            </>
          )}
          {showConfetti && <Confetti />}
        </div>
      </div>
    </div>
  );
};

export default PersonMatcher;
