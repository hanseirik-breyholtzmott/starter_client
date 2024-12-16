"use client";

import { NewsCard } from "./NewsCard";
import { newsItems } from "./data/news";

export function NewsFeed() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-8">
      <div className="space-y-8">
        {newsItems.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            date={item.date}
            content={item.content}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
