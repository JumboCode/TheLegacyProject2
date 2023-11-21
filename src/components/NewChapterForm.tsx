import React from "react";
import { z } from "Zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChapterRequest } from "src/app/api/chapter-request/route.schema";
import { ErrorMessage } from "@hookform/error-message";

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

  const onSubmit: SubmitHandler<typeof ChapterRequest> = (data) =>
    console.log(data);

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
  
    <div className= "grid place-items-center">
    <div className="h-fit w-11/12  bg-dark-teal px-5 py-10 text-lg text-white">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="grid grid-cols-2 gap-x-10 gap-y-3">
          <div className="w-full ">
            <div>First Name</div>
            <input
              {...register("firstName")}
              className="h-8 w-full rounded-md text-black px-1"
            />
            <div className="text-sm">
              <ErrorMessage
                errors={errors}
                name="firstName"
                render={({ message }) => <p>{message}</p>}
              />
            </div>
          </div>
          <div className="w-full">
            <div>Last Name</div>
            <input
              {...register("lastName")}
              className="h-8 w-full rounded-md text-black px-1"
            />
            <div className="text-sm">
              <ErrorMessage
                errors={errors}
                name="lastName"
                render={({ message }) => <p>{message}</p>}
              />
            </div>
          </div>
          <div className="w-full">
            <div>University Email</div>
            <input
              {...register("universityEmail")}
              className="h-8 w-full rounded-md text-black px-1"
            />
            <div className="text-sm">
              <ErrorMessage
                errors={errors}
                name="universityEmail"
                render={({ message }) => <p>{message}</p>}
              />
            </div>
          </div>
          <div className="w-full">
            <div>Phone Number</div>
            <input
              {...register("phoneNumber")}
              className="h-8 w-full rounded-md text-black px-1"
            />
            <div className="text-sm">
              <ErrorMessage
                errors={errors}
                name="phoneNumber"
                render={({ message }) => <p>{message}</p>}
              />
            </div>
          </div>
          <div className="w-full">
            <div>College / University</div>
            <input
              {...register("university")}
              className="h-8 w-full rounded-md text-black px-1"
            />
            <div className="text-sm">
              <ErrorMessage
                errors={errors}
                name="university"
                render={({ message }) => <p>{message}</p>}
              />
            </div>
          </div>
          <div className="w-full">
            <div>College / University Address</div>
            <input
              {...register("universityAddress")}
              className="h-8 w-full rounded-md text-black px-1"
            />
            <div className="text-sm">
              <ErrorMessage
                errors={errors}
                name="universityAddress"
                render={({ message }) => <p>{message}</p>}
              />
            </div>
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
        <div className=" pt-3">
          <div>
            <div>
              Do you have any experience in student leadership / club
              organization / storytelling?{" "}
            </div>
            <textarea
              {...register("leadershipExperience")}
              className="h-18 w-full rounded-md text-black resize-y px-1"
            />
            <div className="text-sm">
              <ErrorMessage
                errors={errors}
                name="leadershipExperience"
                render={({ message }) => <p>{message}</p>}
              />
            </div>
          </div>
          <div className="pt-3">
            <div>
              What motivates you to start this initiative in your community?{" "}
            </div>
            <textarea
              {...register("motivation")}
              className="h-18 w-full rounded-md text-black resize-y px-1"
            />
            <div className="text-sm">
              <ErrorMessage
                errors={errors}
                name="motivation"
                render={({ message }) => <p>{message}</p>}
              />
            </div>
          </div>
          <div className="pt-3">
            <div>
              Please list three 1 hour time blocks with your avalibility in the
              next week{" "}
            </div>
            <input
              {...register("availabilities")}
              className="h-8 w-full rounded-md text-black px-1"
              placeholder="Include the date (mm-dd-yyyy), time (hh:mm am/pm), and your timezone"
            />
            <div className="text-sm">
              <ErrorMessage
                errors={errors}
                name="availabilities"
                render={({ message }) => <p>{message}</p>}
              />
            </div>
          </div>
          <div className="pt-3">
            <div>What questions do you have for us? </div>
            <textarea
              {...register("questions")}
              className="h-8 w-full rounded-md text-black resize-y px-1"
            />
          </div>
        </div>
        <div className="grid place-items-center pt-5">
          <div className="w-1/12 cursor-pointer rounded-lg bg-white px-1 py-1 text-center ">
            <input type="submit" className="items-center text-dark-teal" />
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};
export default NewChapterForm;
