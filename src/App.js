import React, { useState, useEffect } from 'react';

const courses = {
  "Exam Fee": {
    INDIAN: {
      ALL_COURSES: {
        ALL_LEVEL: {
          amount: 400,
        },
      },
    },
    FOREIGN: {
      ALL_COURSES: {
        ALL_LEVEL: {
          amount: 100,
        },
      },
    },
    NRI: {
      ALL_COURSES: {
        ALL_LEVEL: {
          amount: 600,
        },
      },
    },
    SAARC: {
      ALL_COURSES: {
        ALL_LEVEL: {
          amount: 600,
        },
      },
    },
  },
  "Application Fee": {
    INDIAN: {
      ALL_COURSES: {
        UG: {
          amount: 200,
        },
        "UG-DIPLOMA": {
          amount: 300,
        },
        PG: {
          amount: 500,
        },
      },
    },
    FOREIGN: {
      ALL_COURSES: {
        UG: {
          amount: 400,
        },
        "UG-DIPLOMA": {
          amount: 400,
        },
        PG: {
          amount: 700,
        },
      },
    },
  },
};

export default function App() {
  const [examType, setExamType] = useState("");
  const [nationality, setNationality] = useState("");
  const [course, setCourse] = useState("");
  const [level, setLevel] = useState("");
  const [fee, setFee] = useState("");
  const [error, setError] = useState("");

  const [examList, setExamList] = useState([]);
  const [nationalityList, setNationalityList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [levelList, setLevelList] = useState([]);

  useEffect(() => {
    const list = [];
    for (const item in courses) {
      list.push(item)
    }
    setExamList(list);

  }, []);

  const handleExamTypeChange = (e) => {
    setExamType(e.target.value);
    const nList = [];
    for (const item in courses[e.target.value]) {
      nList.push(item);
    }
    setNationalityList(nList);
    setNationality("");
    setCourse("");
    setLevel("");
  }

  const handleNationalityTypeChange = (e) => {
    setNationality(e.target.value);
    let nList = [];

    if ('ALL_COURSES' in courses[examType][e.target.value])
      nList.push(
        {
          name: "Medical", value: "ALL_COURSES"
        },
        {
          name: "Dental", value: "ALL_COURSES"
        },
        {
          name: "Ayurveda", value: "ALL_COURSES"
        }
      );
    else
      for (const item in courses[examType][e.target.value])
        nList.push({ name: item, value: item });

    setCourseList(nList);
    setCourse("");
    setLevel("");
  }

  const handleCourseTypeChange = (e) => {
    setCourse(e.target.value);

    let nList = [];

    if (e.target.value) {
      for (const item in courses[examType][nationality][e.target.value.split(",")[1]]) {
        if (item.toString() == "ALL_LEVEL")
          nList.push(
            {
              name: "UG", value: item
            },
            {
              name: "PG", value: item
            },
            {
              name: "DIPLOMA", value: item
            },
            {
              name: "Ph.D", value: item
            }
          );
        else
          nList.push({ name: item, value: item });
      }
    }

    setLevelList(nList);
    setLevel("");
  }

  const handleLevelTypeChange = (e) => {
    setLevel(e.target.value);

  }

  const handleSubmit = () => {

    if (examType && nationality && course && level) {
      const courseValue = course.split(",")[1];
      const levelValue = level.split(",")[1];
      const feeAmount = courses[examType][nationality][courseValue][levelValue].amount;

      setFee(feeAmount);
      setError("");
    }
    else
      setError("Please select all values");

  }

  return (
    <>
      <div className='container'>
        <h2>Get Course Fee</h2>
        <div class="row g-3 align-items-center" style={{ padding: 10 }}>
          <div class="col-auto">
            <label for="examType" class="col-form-label">Exam Type</label>
          </div>
          <div class="col-auto">
            <select type="text" name="examType" value={examType} onChange={handleExamTypeChange} className="form-select" style={{ minWidth: 250 }} >
              <option value="">--Select--</option>
              {examList.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <div class="row g-3 align-items-center" style={{ padding: 10 }}>
          <div class="col-auto">
            <label for="nationalityType" class="col-form-label">Nationality:</label>
          </div>
          <div class="col-auto">
            <select type="text" name="nationalityType" value={nationality} onChange={handleNationalityTypeChange} className="form-select" style={{ minWidth: 250 }}>
              <option value="">--Select--</option>
              {nationalityList.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <div class="row g-3 align-items-center" style={{ padding: 10 }}>
          <div class="col-auto">
            <label for="courseType" class="col-form-label">Course Type</label>
          </div>
          <div class="col-auto">
            <select type="text" name="courseType" value={course} onChange={handleCourseTypeChange} className="form-select" style={{ minWidth: 250 }}>
              <option value="">--Select--</option>
              {courseList.map(item => (
                <option key={item.name} value={`${item.name},${item.value}`}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div class="row g-3 align-items-center" style={{ padding: 10 }}>
          <div class="col-auto">
            <label for="levelType" class="col-form-label">Select Level</label>
          </div>
          <div class="col-auto">
            <select type="text" name="levelType" value={level} onChange={handleLevelTypeChange} className="form-select" style={{ minWidth: 250 }} >
              <option value="">--Select--</option>
              {levelList.map(item => (
                <option key={item.name} value={`${item.name},${item.value}`}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="button" onClick={handleSubmit} class="btn btn-primary">Submit</button>
        <br />
        {!error && fee && (
          <span className=''>
            <b>Fee Amount is {fee}</b>
          </span>
        )}
        {error && (
          <span className='danger'>
            <b>{error}</b>
          </span>
        )}
      </div>
    </>
  );
}