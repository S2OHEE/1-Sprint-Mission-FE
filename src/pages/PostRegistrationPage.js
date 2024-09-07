import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostRegistrationPage.css";
import { createArticle } from "../api/api";
import ItemsPageHeader from "../components/ItemsPageHeader";
import usePostFormValidation from "../hooks/usePostFormValidation";
import Footer from "../components/Footer";

const INITIAL_VALUES = {
  title: "",
  content: "",
};

export default function PostRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  const { values, setValues, errors, validate, handleBlur } =
    usePostFormValidation(INITIAL_VALUES);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSubmittingError(null);
      setIsSubmitting(true);

      await createArticle({
        title: values.title || "", // 기본값을 빈 문자열로 설정
        content: values.content || "", // 기본값을 빈 문자열로 설정
      });

      setValues(INITIAL_VALUES);
      navigate("/Productinformation");
    } catch (error) {
      console.error("게시글 등록 실패", error);
      setSubmittingError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return Object.keys(errors).length === 0 && values.title && values.content;
  };

  return (
    <div className="RegistrationPage">
      <ItemsPageHeader />
      <div className="product-form">
        <form onSubmit={handleSubmit} noValidate>
          <div className="FormTop">
            <h2>게시글 쓰기</h2>
            <button type="submit" disabled={isSubmitting || !isFormValid()}>
              등록
            </button>
          </div>
          <label className="Label1">
            * 제목
            <input
              id="Input1"
              className={`RegistrationInput ${errors.title ? "error" : ""}`}
              type="text"
              name="title" // name 필드가 title로 일치해야 합니다
              value={values.title || ""} // 빈 문자열을 기본값으로 설정
              onBlur={handleBlur}
              onChange={handleInputChange}
              placeholder="제목을 입력해주세요"
              required
            />
            {errors.title && (
              <div className="error-message">{errors.title}</div>
            )}
          </label>
          <label className="Label2">
            * 내용
            <textarea
              id="Input2"
              name="content" // name 필드가 content로 일치해야 합니다
              className={`RegistrationInput ${errors.content ? "error" : ""}`}
              value={values.content || ""} // 빈 문자열을 기본값으로 설정
              onBlur={handleBlur}
              onChange={handleInputChange}
              placeholder="내용을 입력해주세요"
              required
            />
            {errors.content && (
              <div className="error-message">{errors.content}</div>
            )}
          </label>

          {submittingError && (
            <div className="error-message">
              게시물 등록 실패: {submittingError.message}
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}
