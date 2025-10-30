import React from "react";
import Header from "../components/Header";
import CourseCard from "../components/CourseCard";
import { GetStaticProps } from "next";

interface Course {
  id: string;
  title: string;
  description: string;
  image?: string;
  lessons?: any[];
  lessonCount?: number;
}

export default function Home({ courses }: { courses: Course[] }) {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold">Learn anything — anytime</h1>
              <p className="text-gray-600 mt-2">
                Short, practical courses created by experts. Browse topics, watch
                lessons, and build projects.
              </p>
            </div>
            <div className="flex gap-3">
              <input placeholder="Search courses, e.g. React, Node.js" className="px-4 py-2 rounded-md border w-72" />
              <button className="px-4 py-2 rounded-md bg-indigo-600 text-white">Explore</button>
            </div>
          </div>
        </section>

        <h2 className="text-xl font-semibold mb-4">Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c: Course) => (
            <CourseCard key={c.id ?? JSON.stringify(c).slice(0, 20)} course={c} />
          ))}
        </div>
      </main>
    </>
  );
}

// NOTE: import/require fs & path inside getStaticProps (server-only)
export const getStaticProps: GetStaticProps = async () => {
  // require inside function to avoid client-side bundling issues
  const fs = require("fs");
  const path = require("path");

  const projectRoot = process.cwd();
  const tryPaths = [
    path.join(projectRoot, "data", "courses.json"),
    path.join(projectRoot, "data", "courses"),
    path.join(projectRoot, "data"),
  ];

  let courses: any[] = [];

  try {
    // 1) If data/courses.json exists and is an array, use it
    const file1 = tryPaths[0];
    if (fs.existsSync(file1)) {
      const raw = fs.readFileSync(file1, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        courses = parsed;
      } else if (parsed && parsed.courses && Array.isArray(parsed.courses)) {
        courses = parsed.courses;
      }
    }

    // 2) If still empty, look for data/courses/*.json files
    if (courses.length === 0) {
      const folder = tryPaths[1];
      if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
        const files = fs.readdirSync(folder).filter((f: string) => f.endsWith(".json"));
        for (const f of files) {
          try {
            const raw = fs.readFileSync(path.join(folder, f), "utf-8");
            const parsed = JSON.parse(raw);
            // each file might be a single course object or an array
            if (Array.isArray(parsed)) {
              courses.push(...parsed);
            } else {
              courses.push(parsed);
            }
          } catch (e) {
            // ignore invalid JSON files
          }
        }
      }
    }

    // 3) fallback: look for any top-level JSON files in data/
    if (courses.length === 0) {
      const dataDir = tryPaths[2];
      if (fs.existsSync(dataDir) && fs.statSync(dataDir).isDirectory()) {
        const files = fs.readdirSync(dataDir).filter((f: string) => f.endsWith(".json"));
        for (const f of files) {
          try {
            const raw = fs.readFileSync(path.join(dataDir, f), "utf-8");
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              courses.push(...parsed);
            } else if (parsed && parsed.courses && Array.isArray(parsed.courses)) {
              courses.push(...parsed.courses);
            } else {
              // if file is a single course object, push it
              if (parsed && (parsed.title || parsed.name || parsed.id || parsed.slug)) {
                courses.push(parsed);
              }
            }
          } catch (e) {
            // ignore parse error
          }
        }
      }
    }
  } catch (err) {
    // ignore errors and return empty list (app will show no courses)
    courses = [];
  }

  // Add lessonCount to each course based on lessons array
  courses = courses.map((course) => ({
    ...course,
    lessonCount: course.lessons ? course.lessons.length : 0,
  }));

  return {
    props: {
      courses: courses || [],
    },
  };
};
