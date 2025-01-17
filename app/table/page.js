'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Table from '@/components/Table';

const PaginatedTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page) => {
    setLoading(true); // Start loading
    try {
      const res = await fetch(`https://backend-three-hazel-38.vercel.app/api/items?page=${page}`);
      const { data, totalPages } = await res.json();
      setTimeout(() => {
        setData(data);
        setTotalPages(totalPages);
        setLoading(false); // Stop loading after data is set
      }, 2000); // Simulate delay for the shimmer effect
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Stop loading even on error
    }
  };




  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <Layout>
      <Table
        data={data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        fetchData={fetchData}
      />
    </Layout>
  );
};

export default PaginatedTable;
