import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    category?: string;
    lessonCount?: number;
    image?: string; // ✅ Optional image field
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image or fallback gradient */}
      <div className="relative w-full h-40">
        {course.image ? (
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-end p-3 text-gray-600 text-sm">
            {course.category || "General"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-gray-600 text-sm">{course.description}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-500">
            {course.lessonCount || 0} lessons
          </span>
          <Link
            href={`/courses/${course.id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-md transition"
          >
            View course →
          </Link>
        </div>
      </div>
    </div>
  );
}
