"use client";

import { Play, Smile, Heart } from "lucide-react";
import {
  LiftedTabs,
  LiftedTabsContent,
  LiftedTabsList,
  LiftedTabsTrigger,
} from "./lifted-tabs";

export function LiftedTabsDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Lifted Tabs Demo</h2>
        <p className="text-gray-600">
          Experience the beautiful lifted tabs design inspired by modern UI
          patterns
        </p>
      </div>

      <LiftedTabs
        defaultValue="notebooks"
        className="space-y-0 bg-white rounded-lg shadow-sm"
      >
        <LiftedTabsList>
          <LiftedTabsTrigger value="items">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
            Items
          </LiftedTabsTrigger>
          <LiftedTabsTrigger value="notebooks">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1h6v4H7V6zm6 6H7v2h6v-2z"
                clipRule="evenodd"
              />
            </svg>
            Notebooks
          </LiftedTabsTrigger>
          <LiftedTabsTrigger value="canvases">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Canvases
          </LiftedTabsTrigger>
        </LiftedTabsList>

        <LiftedTabsContent value="items">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Items</h3>
            <p className="text-gray-600">
              Manage your items and files. Notice how the active tab creates a
              seamless connection with the content area below, just like in the
              reference design.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-2">Recent Items</h4>
                <p className="text-sm text-gray-600">
                  Your latest files and documents
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-2">Shared Items</h4>
                <p className="text-sm text-gray-600">Items shared with you</p>
              </div>
            </div>
          </div>
        </LiftedTabsContent>

        <LiftedTabsContent value="notebooks">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Notebooks</h3>
            <p className="text-gray-600">
              This is the active tab - notice how it appears "lifted" above the
              others with a seamless connection to the content area. This
              creates a beautiful visual hierarchy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">
                  Personal Notebooks
                </h4>
                <p className="text-sm text-blue-700">
                  Your private notebooks and thoughts
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">
                  Team Notebooks
                </h4>
                <p className="text-sm text-green-700">
                  Collaborative workspaces
                </p>
              </div>
            </div>
          </div>
        </LiftedTabsContent>

        <LiftedTabsContent value="canvases">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Canvases</h3>
            <p className="text-gray-600">
              Create and collaborate on visual canvases. The lifted design makes
              it clear which section is currently active and provides an elegant
              user experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">
                  Whiteboards
                </h4>
                <p className="text-sm text-purple-700">
                  Visual thinking and brainstorming
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-2">Templates</h4>
                <p className="text-sm text-orange-700">
                  Pre-designed canvas layouts
                </p>
              </div>
            </div>
          </div>
        </LiftedTabsContent>
      </LiftedTabs>
    </div>
  );
}
