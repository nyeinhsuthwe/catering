import React, { useEffect } from "react";
import { Textarea, Button, Card } from "flowbite-react";
import { useApiMutation } from "../../hooks/useMutation";
import { useForm } from "react-hook-form";
import { feedback } from "../../store/feedback";
import { userStore } from "../../store/userStore";
import Rating from "react-rating";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useApiQuery } from "../../hooks/useQuery";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const Feedback = () => {
  const { register, handleSubmit, setValue, reset, watch } = useForm();
  const { feedBack, addFeedback, setFeedback, removeFeedback } = feedback();
  const { user } = userStore();

  const rating = watch("rating");
  const queryClient = useQueryClient();

  //feedback post mutation
  const mutation = useApiMutation({
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['feedback']
      })
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
  const { data: feedbackList } = useApiQuery(
    {
      endpoint: `feedback/show/${user.employeeId}`,
      queryKey: ["feedback"],
    },
    {
      onSuccess: (data) => {
        setFeedback(data);
      },
    }
  );

  useEffect(() => {
    if (feedbackList) {
      setFeedback(feedbackList);
    }
  }, [feedbackList, setFeedback]);

  // feedback delete mutation
  const deleteMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] })

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

  return (
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

        <div className="mt-3">
          <label className="block text-sm font-medium mb-1">Your Rating:</label>
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
          className="bg-gray-500 hover:bg-gray-600 mt-4 justify-end"
        >
          Submit
        </Button>
      </form>

      <div className="w-2/3 mt-6 pr-9 flex flex-col gap-4">
        {feedBack?.length > 0 ? (
          feedBack?.map((item, index) => (
            <Card key={item.fb_id || index} className="w-[500px]">
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {item?.text}
              </p>

              <Rating
                initialRating={parseFloat(item?.rating)}
                readonly
                fractions={2}
                emptySymbol={<FaRegStar className="text-yellow-400 text-md" />}
                fullSymbol={<FaStar className="text-yellow-400 text-md" />}
              />
              <p className="text-sm text-yellow-500 mt-1">
                Rating: {parseFloat(item?.rating)} / 5
              </p>

              <div className="flex gap-3 justify-end mt-2">
                <button onClick={() => handleDelete(item.fb_id)}>
                  <i className="fa-solid fa-trash text-red-500 cursor-pointer"></i>
                </button>
              </div>
            </Card>
          ))
        ) : (
          <p>There is no feedback</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
