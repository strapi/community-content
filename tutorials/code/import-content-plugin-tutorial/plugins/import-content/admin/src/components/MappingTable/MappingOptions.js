import React, { Component } from "react";
import TargetFieldSelect from "./TargetFieldSelect";
import { Label } from "@buffetjs/core";

const MappingOptions = ({ stat, onChange, targetModel }) => {
  return (
    <div>
      {stat.format === "xml" && (
        <div>
          <Label htmlFor={"stripCheckbox"} message={"Strip Tags"} />
          <input
            name={"stripCheckbox"}
            type="checkbox"
            onChange={e => onChange({ stripTags: e.target.checked })}
          />
        </div>
      )}
      {stat.hasMediaUrls && (
        <div style={{ paddingTop: 8, paddingBottom: 8 }}>
          <Label
            htmlFor={"mediaTargetSelect"}
            message={"Import Media to Field"}
          />
          <TargetFieldSelect
            name={"mediaTargetSelect"}
            targetModel={targetModel}
            onChange={targetField =>
              onChange({ importMediaToField: targetField })
            }
          />
        </div>
      )}
    </div>
  );
};

export default MappingOptions;
