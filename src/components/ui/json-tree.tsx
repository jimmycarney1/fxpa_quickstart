'use client';

import * as React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JsonTreeProps {
  data: unknown;
  defaultExpanded?: boolean;
  className?: string;
}

interface JsonNodeProps {
  keyName?: string;
  value: unknown;
  depth: number;
  defaultExpanded: boolean;
  isLast?: boolean;
}

const getValuePreview = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `[${value.length} item${value.length !== 1 ? 's' : ''}]`;
  }
  if (typeof value === 'object' && value !== null) {
    const keys = Object.keys(value);
    return `{${keys.length} key${keys.length !== 1 ? 's' : ''}}`;
  }
  return '';
};

const JsonNode: React.FC<JsonNodeProps> = ({
  keyName,
  value,
  depth,
  defaultExpanded,
  isLast = true,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded && depth < 2);
  const isExpandable = (typeof value === 'object' && value !== null);
  const indent = depth * 16;

  const renderValue = () => {
    if (value === null) {
      return <span className="text-gray-500">null</span>;
    }
    if (typeof value === 'undefined') {
      return <span className="text-gray-500">undefined</span>;
    }
    if (typeof value === 'boolean') {
      return <span className="text-amber-600 dark:text-amber-400">{value.toString()}</span>;
    }
    if (typeof value === 'number') {
      return <span className="text-blue-600 dark:text-blue-400">{value}</span>;
    }
    if (typeof value === 'string') {
      // Truncate very long strings
      const displayValue = value.length > 100 ? `${value.slice(0, 100)}...` : value;
      return <span className="text-green-600 dark:text-green-400">&quot;{displayValue}&quot;</span>;
    }
    return null;
  };

  if (!isExpandable) {
    return (
      <div className="flex items-start font-mono text-sm" style={{ paddingLeft: indent }}>
        {keyName !== undefined && (
          <>
            <span className="text-purple-600 dark:text-purple-400">&quot;{keyName}&quot;</span>
            <span className="text-foreground mx-1">:</span>
          </>
        )}
        {renderValue()}
        {!isLast && <span className="text-foreground">,</span>}
      </div>
    );
  }

  const isArray = Array.isArray(value);
  const entries = isArray
    ? (value as unknown[]).map((v, i) => [i.toString(), v] as [string, unknown])
    : Object.entries(value as Record<string, unknown>);
  const openBracket = isArray ? '[' : '{';
  const closeBracket = isArray ? ']' : '}';

  return (
    <div className="font-mono text-sm">
      <div
        className={cn(
          "flex items-center cursor-pointer hover:bg-muted/50 rounded -ml-1 pl-1",
          isExpandable && "select-none"
        )}
        style={{ paddingLeft: indent }}
        onClick={() => isExpandable && setIsExpanded(!isExpanded)}
      >
        {isExpandable && (
          <span className="w-4 h-4 flex items-center justify-center mr-1 text-muted-foreground">
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </span>
        )}
        {keyName !== undefined && !isArray && (
          <>
            <span className="text-purple-600 dark:text-purple-400">&quot;{keyName}&quot;</span>
            <span className="text-foreground mx-1">:</span>
          </>
        )}
        {keyName !== undefined && isArray && (
          <>
            <span className="text-purple-600 dark:text-purple-400">&quot;{keyName}&quot;</span>
            <span className="text-foreground mx-1">:</span>
          </>
        )}
        <span className="text-foreground">{openBracket}</span>
        {!isExpanded && (
          <>
            <span className="text-muted-foreground mx-1 text-xs">
              {getValuePreview(value)}
            </span>
            <span className="text-foreground">{closeBracket}</span>
            {!isLast && <span className="text-foreground">,</span>}
          </>
        )}
      </div>
      {isExpanded && (
        <>
          {entries.map(([key, val], index) => (
            <JsonNode
              key={key}
              keyName={isArray ? undefined : key}
              value={val}
              depth={depth + 1}
              defaultExpanded={defaultExpanded}
              isLast={index === entries.length - 1}
            />
          ))}
          <div style={{ paddingLeft: indent }}>
            <span className="text-foreground ml-5">{closeBracket}</span>
            {!isLast && <span className="text-foreground">,</span>}
          </div>
        </>
      )}
    </div>
  );
};

export function JsonTree({ data, defaultExpanded = true, className }: JsonTreeProps) {
  return (
    <div className={cn("py-2", className)}>
      <JsonNode value={data} depth={0} defaultExpanded={defaultExpanded} />
    </div>
  );
}
