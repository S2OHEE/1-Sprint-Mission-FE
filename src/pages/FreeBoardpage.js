import React, { useEffect, useState, useMemo, useCallback } from "react";
import searchIcon from "../assets/images/ic_search.png";
import ItemsPageHeader from "../components/ItemsPageHeader";
import { useNavigate } from "react-router-dom";
import "./FreeBoardpage.css";
import "../styles/Responsive.css";
import PostList from "../components/PostList"; // 상품 리스트 -> 게시글 리스트
import { filterPostsByName } from "../api/api"; // 검색 함수 변경
import BestPostsList from "../components/BestPostsList";
import Pagination from "../components/Pagination";
import usePostList from "../hooks/usePostList"; // 커스텀 훅 변경
import { LIMIT } from "../constants";
import Footer from "../components/Footer";

export default function FreeBoardPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState("createdAt");

  // 검색 기능
  const [searchPosts, setSearchPosts] = useState(""); // 검색 입력 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [searchError, setSearchError] = useState(null);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);

  // 커스텀 훅 호출
  const { posts, hasNext, loadingError, totalPages, fetchPosts } = usePostList(
    order,
    (currentPage - 1) * LIMIT
  );

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
    setCurrentPage(1); // 정렬 순서 변경 시 첫 페이지로 이동
    fetchPosts(1);
  };

  // 엔터키로 검색 입력
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  // 검색 입력 핸들러
  const handleSearchChange = (event) => {
    setSearchPosts(event.target.value);
  };

  // 검색 실행 핸들러
  const handleSearchClick = useCallback(() => {
    try {
      if (searchPosts.trim() === "") {
        setSearchResults([]);
        setSearchError("⚠ 검색어를 입력해 주세요.");
        return;
      }
      const results = filterPostsByName(posts, searchPosts); // 상품 -> 게시글

      if (results.length === 0) {
        setSearchResults([]);
        setSearchError("게시글이 존재하지 않습니다.");
      } else {
        setSearchResults(results);
        setSearchError(null);
      }
    } catch (error) {
      setSearchError("검색 중 오류가 발생했습니다.");
      console.error("검색 오류", error);
    }
  }, [searchPosts, posts]);

  // 페이지 클릭 핸들러
  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchPosts(page); // 페이지 변경 시 데이터 새로고침
  };

  /* 글쓰기 버튼 눌렀을때 이동페이지*/
  const handleAddPostClick = () => {
    navigate("/post-registration");
  };

  // 게시글 정렬
  const sortedPosts = useMemo(() => {
    if (Array.isArray(posts)) {
      if (order === "createdAt") {
        return [...posts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (order === "likeCount") {
        return [...posts].sort((a, b) => b.likeCount - a.likeCount);
      }
    }
    return []; // posts가 배열이 아닐 경우 빈 배열 반환
  }, [posts, order]);

  useEffect(() => {
    fetchPosts(currentPage); // 초기 로드 및 페이지 변경 시 로드
  }, [order, currentPage, fetchPosts]);

  // 현재 페이지에 맞는 게시글 목록 추출
  const currentPagePosts = sortedPosts.slice(
    (currentPage - 1) * LIMIT,
    currentPage * LIMIT
  );

  // 검색 결과가 있을 때 검색된 게시글을 사용하고, 그렇지 않으면 현재 페이지 게시글을 사용
  const displayPosts =
    searchResults.length > 0 ? searchResults : currentPagePosts;

  return (
    <div className="App">
      <ItemsPageHeader />
      <main className="bestPostsContainer">
        <div className="firstContainer">
          <BestPostsList />
        </div>
        <div className="postsContainer">
          <h2>게시글</h2>
          <button className="postBtn" onClick={handleAddPostClick}>
            글쓰기
          </button>
        </div>
        <div className="inputDrop">
          <input
            type="text"
            placeholder="검색할 게시글을 입력해주세요" // 플레이스홀더 변경
            className="freeSearchInput" // 클래스 이름 변경
            style={{ backgroundImage: `url(${searchIcon})` }}
            value={searchPosts}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <select className="sortDropDown" onChange={handleOrderChange}>
            <option value="createdAt">최신순</option>
            <option value="likeCount">좋아요 순</option>
          </select>
        </div>
        {searchError && <div className="search-error">{searchError}</div>}
        {searchPosts && searchResults.length > 0 && (
          <div className="search-results">
            <h3>검색 결과</h3>
            <ul>
              {searchResults.map((post) => (
                <li key={post.id}>{post.name}</li>
              ))}
            </ul>
          </div>
        )}
        {loadingError && <span>{loadingError}</span>}
        <PostList posts={displayPosts} /> {/* 컴포넌트 이름 변경 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageClick}
          hasNext={hasNext}
        />
      </main>
      <Footer />
    </div>
  );
}
