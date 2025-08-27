import React, { useEffect, useState } from "react";
import { Textarea, Button, Card } from "flowbite-react";
import { useApiMutation } from "../../hooks/useMutation";
import { useForm } from "react-hook-form";
import { feedback } from "../../store/feedback";
import { userStore } from "../../store/userStore";
import Rating from "react-rating";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useApiQuery } from "../../hooks/useQuery";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Pagination } from "flowbite-react";

const Feedback = () => {
  const { register, handleSubmit, setValue, reset, watch } = useForm();
  const { feedBack, addFeedback, setFeedback } = feedback();
  const { user } = userStore();


  //pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  const rating = watch("rating");
  const queryClient = useQueryClient();

  //feedback post mutation
  const mutation = useApiMutation({
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["feedback"],
      });
      toast.success("successfully created");
      addFeedback(res.data);
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      endpoint: "feedback/create",
      method: "POST",
      body: {
        emp_id: user.employeeId,
        text: data.text,
        rating: Number(data.rating),
      },
    });
  };

  // feedback query
  const { data: feedbackList, isLoading } = useApiQuery({
    endpoint: `feedback/show/${user.employeeId}`,
    queryKey: ["feedback"],
  });


  console.log(feedbackList);

  

 const sortedFeedback = [...(feedbackList || [])].sort(function (a, b) {
  return new Date(b.updated_at) - new Date(a.updated_at);
});



  console.log(sortedFeedback);
  const count = 4;
  const paginatedFeedback = sortedFeedback?.slice(
    (currentPage - 1) * count,
    currentPage * count
  );
    const totalPages = Math.max(1, Math.ceil(sortedFeedback.length / count));


  // feedback delete mutation
  const deleteMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      toast.success("successfully deleted!");
    },
    onError: (error) => {
      console.error(
        "Delete failed:",
        error?.response?.data?.message || error.message
      );
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate({
      endpoint: `feedback/destroy/${id}`,
      method: "DELETE",
    });

    console.log(`Deleting feedback at: feedback/destroy/${id}`);
  };

  if (isLoading) {
    return "Loading";
  }

  const formatDateTime = (utcDatetime) => {
    const utcDate = new Date(utcDatetime);
    const myanmarTime = new Date(utcDate.getTime() + 390 * 60 * 1000);

    return myanmarTime.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="h-[90vh] w-full overflow-y-scroll py-6 pr-11 flex flex-col items-center ">
      <div className="w-full flex gap-[100px]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 mx-auto mt-6">
          <Textarea
            id="comment"
            type="text"
            placeholder="Write your comment here..."
            rows={4}
            required
            {...register("text")}
          />

          <div className="mt-3 ml-2">
            <label className="block text-sm font-medium mb-1">
              Your Rating:
            </label>
            <Rating
              initialRating={rating || 0}
              fractions={2}
              emptySymbol={<FaRegStar className="text-yellow-400 text-xl" />}
              fullSymbol={<FaStar className="text-yellow-400 text-xl" />}
              placeholderSymbol={
                <FaStarHalfAlt className="text-yellow-400 text-xl" />
              }

              onChange={(value) =>
                setValue("rating", value, { shouldValidate: true })
              }
            />
          </div>

          <input
            type="hidden"
            {...register("rating", {
              required: "Rating is required",
              valueAsNumber: true,
            })}
          />

          <Button
            type="submit"
            className="bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400  mt-4 ml-2 justify-end"
          >
            Submit
          </Button>
        </form>

        <div className="w-2/3 mt-6 flex flex-col gap-4">
          {sortedFeedback?.length > 0 ? (
            paginatedFeedback?.map((item, index) => (
              <Card key={index} className="w-[500px]">
                <div className="flex space-x-4 items-center justify-between">
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {item?.text}
                  </p>
                  <button onClick={() => handleDelete(item.fb_id)}>
                    <i className="fa-solid fa-trash text-red-500 cursor-pointer"></i>
                  </button>
                </div>

                <Rating
                  initialRating={parseFloat(item?.rating)}
                  readonly
                  fractions={2}
                  emptySymbol={
                    <FaRegStar className="text-yellow-400 text-md" />
                  }
                  fullSymbol={<FaStar className="text-yellow-400 text-sm" />}
                />

                <div className="flex space-x-4 items-center justify-between">
                  <p className="text-sm text-yellow-500">
                    Rating: {parseFloat(item?.rating)} / 5
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDateTime(item?.updated_at)}
                  </p>
                </div>
              </Card>
            ))
          ) : (
            <p>There is no feedback</p>
          )}
        </div>
      </div>
      <div className="flex overflow-x-auto justify-end w-[67%] mt-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Feedback;
