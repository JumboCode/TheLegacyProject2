import React from "react";
import { z } from "Zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChapterRequest } from "src/app/api/chapter-request/route.schema";

const NewChapterForm = () => {
  const title = [
    "First Name",
    "Last Name",
    "University Email",
    "Phone Number",
    "University",
    "University Address",
  ];



  // const schema = ChapterRequest
  // .object({
  //   firstName: ChapterRequest.string().required(),
  //   lastName: ChapterRequest.string().required(),
  //   universityEmail: ChapterRequest.string().email("This is not a valid email").required(),
  //   phoneNumber: ChapterRequest.string().length(10, "Phone number must be 10 digits").required(),
  //   university: ChapterRequest.string().required(),
  //   universityAddress: ChapterRequest.string().required(),
  //   leadershipExperience: ChapterRequest.string().required(),
  //   motivation: ChapterRequest.string().required(),
  //   availabilities: z.string(),
  //   questions: z.string(),
  // })
  // .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(ChapterRequest),
  });

  const onSubmit: SubmitHandler<typeof ChapterRequest> = (data) => console.log(data);


  // const validationSchema = z
  // .object({
  //   firstName: z.string().min(1, { message: "Firstname is required" }),
  //   lastName: z.string().min(1, { message: "Lastname is required" }),
  //   email: z.string().min(1, { message: "Email is required" }).email({
  //     message: "Must be a valid email",
  //   })
  // })

  type ValidationSchema = z.infer<typeof ChapterRequest>;
  

  return (
    <div className="h-fit w-full bg-[#d7a6c6] px-5 py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 ">
          <div className="w-full">
            <div>First Name</div>
            <input
              {...register("firstName")}
              className="h-8 w-full rounded-md"
            />
          </div>
          <div className="w-full">
            <div>Last Name</div>
            <input
              {...register("lastName")}
              className="h-8 w-full rounded-md"
            />
          </div>
          <div className="w-full">
            <div>University Email</div>
            <input
              {...register("universityEmail")}
              className="h-8 w-full rounded-md"
            />
          </div>
          <div className="w-full">
            <div>Phone Number</div>
            <input
              {...register("phoneNumber")}
              className="h-8 w-full rounded-md"
            />
          </div>
          <div className="w-full">
            <div>College / University</div>
            <input
              {...register("university")}
              className="h-8 w-full rounded-md"
            />
          </div>
          <div className="w-full">
            <div>College / University Address</div>
            <input
              {...register("universityAddress")}
              className="h-8 w-full rounded-md"
            />
          </div>
          {/* {title.map((item, index) => (
            <div key={index} className="w-full">
              <div>{item}</div>
              <div>
                <input className="h-8 w-full rounded-md " />
              </div>
            </div>
          ))} */}
        </div>
        <div>
          <div>
            <div>
              Do you have any experience in student leadership / club
              organization / storytelling?{" "}
            </div>
            <input
              {...register("leadershipExperience")}
              className="h-8 w-full rounded-md "
            />
          </div>
          <div>
            <div>
              What motivates you to start this initiative in your community?{" "}
            </div>
            <input
              {...register("motivation")}
              className="h-8 w-full rounded-md "
            />
          </div>
          <div>
            <div>
              Please list three 1 hour time blocks with your avalibility in the
              next week{" "}
            </div>
            <input
              {...register("availabilities")}
              className="h-8 w-full rounded-md "
            />
          </div>
          <div>
            <div>What questions do you have for us? </div>
            <input
              {...register("questions")}
              className="h-8 w-full rounded-md "
            />
          </div>
        </div>
        <input type="submit" className="cursor-pointer" />
      </form>
    </div>
  );
};
export default NewChapterForm;
