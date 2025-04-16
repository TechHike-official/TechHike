import { MessageSquare, Plus } from "lucide-react";
import React from "react";

export default function DeveloperList({ developers = [] }) {
  return (
    <div className="bg-white  shadow-md p-6 max-w-md mx-auto">
      <div className="space-y-3">
        {developers.map((developers, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 hover:bg-gray-50  transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                  {developers.name.charAt(0)}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {developers.name}
                </h3>
                  <p className="text-xs text-gray-500">{developers.email}</p>
                {/* <p className="text-xs text-gray-500">{member.role}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
