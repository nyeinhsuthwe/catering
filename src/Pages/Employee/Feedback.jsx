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
