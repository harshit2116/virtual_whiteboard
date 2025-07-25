"use client";

import qs from "query-string";
import { Search, Sparkles, Zap } from "lucide-react";
import { useDebounce } from "usehooks-ts";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";

import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedValue = useDebounce(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: "/",
      query: {
        search: debouncedValue,
      },
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, router]);
  return (
    <div className="w-full relative group">
      <div className={`
        absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
        rounded-2xl blur-md transition-all duration-300 
        ${isFocused ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}
      `}></div>
      
      <div className="relative">
        <Search
          className={`
            absolute top-1/2 left-4 transform -translate-y-1/2 h-5 w-5 transition-all duration-300
            ${isFocused ? 'text-blue-300' : 'text-white/60'}
          `}
        />
        <Zap
          className={`
            absolute top-1/2 right-16 transform -translate-y-1/2 h-4 w-4 transition-all duration-300
            ${value ? 'text-yellow-300 animate-pulse' : 'text-white/40 opacity-0'}
          `}
        />
        <Sparkles
          className={`
            absolute top-1/2 right-4 transform -translate-y-1/2 h-4 w-4 transition-all duration-300
            ${value && isFocused ? 'text-purple-300 animate-pulse' : 'text-white/40 opacity-0'}
          `}
        />
        <Input
          className="
            w-full max-w-[520px] pl-12 pr-20 py-3 
            bg-white/10 border border-white/30 rounded-2xl
            text-white placeholder:text-white/60
            focus:border-blue-400/50 focus:bg-white/20
            transition-all duration-300 hover:border-white/50
            backdrop-blur-sm font-medium
          "
          placeholder="Search boards, projects, and more..."
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
        />
      </div>
    </div>
  );
};
