"use client";
import axios from "axios";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Link from "next/link";

const ViewDetailBlog = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  const fetcher = async (url: string) => (await axios.get(url)).data;
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  console.log(data);
  return (
    <div>
      <div>
        <Link href={"/blogs"}>Go Back</Link>
      </div>
      <Card>
        <Card.Body>
          <Card.Header>{data?.title}</Card.Header>
          <Card.Text>{data?.content}</Card.Text>
          <Card.Footer>{data?.author}</Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
};
export default ViewDetailBlog;
