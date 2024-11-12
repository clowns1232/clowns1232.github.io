import fsPromises, * as fs from "fs/promises";
import path from "path";

import { NextPage } from "next";

import Activity from "@/components/Activity";
import Certificate from "@/components/Certificate";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Information from "@/components/Information";
import Layout from "@/components/Layout";
import Project from "@/components/Project";
import ResumeTitle from "@/components/ResumeTitle";
// import ScrollProgress from "@/components/ScrollProgress";
import WorkExperience from "@/components/WorkExperience";
import {
  DataProps,
  InformationProps,
  ProjectProps,
  WorkExperienceProps,
} from "@/types";
import Award from "@/components/Award";

const Home: NextPage<DataProps> = ({
  resumeTitle,
  information,
  workExperience,
  project,
  activity,
  education,
  certificate,
  award,
}) => {
  return (
    <>
      {/* <ScrollProgress /> */}
      <ResumeTitle resumeTitle={resumeTitle} />
      <Layout>
        <Information information={information} />
        {workExperience.length > 0 && (
          <WorkExperience workExperience={workExperience} />
        )}
        {project.length > 0 && <Project project={project} />}
        {activity.length > 0 && <Activity activity={activity} />}
        {education.length > 0 && <Education education={education} />}
        {certificate.length > 0 && <Certificate certificate={certificate} />}
        {award.length > 0 && <Award award={award} />}
      </Layout>
      <Footer contact={information.contact} name={information.name} />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await fsPromises.readFile(filePath, "utf8");
  const objectData = JSON.parse(jsonData);

  const informationWithData = getImgSrc({
    section: "information",
    item: await getMd({
      section: "information",
      item: { ...objectData.information },
    }),
  });

  const workExperienceWithData = objectData.workExperience.map(
    async (item: WorkExperienceProps) => {
      return getImgSrc({
        section: "workExperience",
        item: await getMd({ section: "workExperience", item }),
      });
    }
  );

  const projectWithData = objectData.project.map(async (item: ProjectProps) => {
    return getImgSrc({
      section: "project",
      item: await getMd({ section: "project", item }),
    });
  });

  return {
    props: {
      ...objectData,
      information: await informationWithData,
      workExperience: await Promise.all(workExperienceWithData),
      project: await Promise.all(projectWithData),
    },
  };
};

const getMd = async ({
  section,
  item,
}: {
  section: string;
  item: InformationProps | ProjectProps | WorkExperienceProps;
}) => {
  try {
    const markdownModule = await import(
      `../../public/markdown/${section}/${
        "id" in item ? item.id : "introduce"
      }.md`
    );
    return { ...item, markdown: markdownModule.default as string };
  } catch {
    console.log("no markdown");
    return item;
  }
};

const getImgSrc = async ({
  section,
  item,
}: {
  section: string;
  item: InformationProps | ProjectProps | WorkExperienceProps;
}) => {
  const imgSrc = `/images/${section}/${"id" in item ? item.id : "profile"}.png`;

  const filePath = path.join(process.cwd(), "public", imgSrc);

  console.log(imgSrc);
  console.log(filePath);

  try {
    await fs.stat(filePath);
    return { ...item, imgSrc: imgSrc };
  } catch (e) {
    console.log("no img", e);
    return item;
  }
};
