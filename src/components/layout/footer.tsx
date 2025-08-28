"use client";

import * as React from 'react';

export function Footer() {
  const [year, setYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-background">
      <div className="container flex h-14 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {year} LearnWeb. All reserved.
        </p>
      </div>
    </footer>
  );
}
