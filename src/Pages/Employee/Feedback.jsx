<<<<<<< HEAD
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
import toast from "react-hot-toast";



const Feedback = () => {
  const { register, handleSubmit, setValue, reset, watch } = useForm();
  const { feedBack, addFeedback, setFeedback } = feedback();
  const { user } = userStore();

  const rating = watch("rating");
  const queryClient = useQueryClient();

  //feedback post mutation
  const mutation = useApiMutation({
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['feedback']
      })
      toast.success("successfully created")
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
  const { data: feedbackList, isLoading } = useApiQuery(
    {
      endpoint: `feedback/show/${user.employeeId}`,
      queryKey: ["feedback"],
    }
  );

  console.log(feedbackList);

  // feedback delete mutation
  const deleteMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] })
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

  if( isLoading){
    return "Loading";
  }

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
        {feedbackList?.length > 0 ? (
          feedbackList?.map((item, index) => (
            <Card key={index} className="w-[500px]">
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
=======
import React from "react";
import { Textarea, Button, Card } from "flowbite-react";
// import { feedbackStore } from "../../store/feedback";
// import { useApiMutation } from "../../hooks/useMutation";
// import { useForm } from 'react-hook-form';

const Feedback = () => {
  // const { register, handleSubmit } = useForm();

  // const {FeedBack, setFeedBack} = feedbackStore();
  // const mutation = useApiMutation({
  //   onSuccess : (res)=>{
  //     console.log(res)
  //   }
  // })

  // const onSubmit =(data)=>{
  //   mutation.mutate({
  //     endpoint: "feedback",
  //     method: "POST",
  //     body: { ...data }
  //   })
  // }
  return (
    <div className="w-full flex gap-[100px]">
      <div className="w-1/3 mx-auto mt-6 ">
        <Textarea
          id="comment"
          placeholder="Write your comment here..."
          rows={4}
          required
          // {...register("")}
        />
        <Button className="bg-gray-500 hover:bg-gray-600 mt-2 justify-end">
          Submit
        </Button>
      </div>
      <div className="w-2/3 mt-6 pr-9">
        <Card href="#" className="w-[500px]">
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <div className="flex gap-3 justify-end">
            <i className="fa-solid fa-trash text-red-500"></i>
            <i className="fa-solid fa-pen-to-square text-gray-600"></i>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;
>>>>>>> admin
