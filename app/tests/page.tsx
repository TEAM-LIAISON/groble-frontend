import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import Switch from "@/components/switch";
import TextField from "@/components/text-field";

export default function Page() {
  return (
    <>
      {["box", "line"].map((type) => (
        <section key={type}>
          <div>
            <TextField
              label="Label"
              labelHelper="Label helper"
              helperText="Helper Text"
              placeholder="Placeholder"
              maxLength={1000}
              type={type as "box" | "line"}
            />
          </div>
          <div>
            <TextField
              label="Label"
              labelHelper="Label helper"
              helperText="Helper Text"
              placeholder="Placeholder"
              defaultValue="Value"
              maxLength={1000}
              type={type as "box" | "line"}
            />
          </div>
          <div>
            <TextField
              label="Label"
              labelHelper="Label helper"
              helperText="Helper Text"
              defaultValue="편집 중입니다"
              maxLength={1000}
              type={type as "box" | "line"}
            />
          </div>
          <div>
            <TextField
              label="10자 이상"
              labelHelper="Label helper"
              helperText="Helper Text"
              placeholder="Placeholder"
              minLength={10}
              maxLength={20}
              type={type as "box" | "line"}
            />
          </div>
          <div>
            <TextField
              label="Disabled"
              labelHelper="Label helper"
              helperText="Helper Text"
              placeholder="Placeholder"
              minLength={10}
              maxLength={20}
              disabled
              type={type as "box" | "line"}
            />
          </div>
        </section>
      ))}
      <section>
        {["solid", "outlined", "text"].map((group) => (
          <div key={group} className="flex flex-wrap gap-2">
            {["secondary", "primary", "primary-dark"].map((type) => (
              <div key={type} className="flex flex-wrap gap-2">
                {["large", "medium", "small", "x-small"].map((size) => (
                  <Button
                    key={size}
                    group={group as "solid" | "outlined" | "text"}
                    type={type as "secondary" | "primary" | "primary-dark"}
                    size={size as "large" | "medium" | "small" | "x-small"}
                  >
                    <svg
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.18367 2.81987C9.7323 1.5008 11.6009 1.5008 12.1495 2.81987L13.9193 7.07495C13.9586 7.16939 14.0474 7.23391 14.1494 7.24209L18.7431 7.61036C20.1671 7.72453 20.7446 9.50168 19.6596 10.4311L16.1597 13.4291C16.082 13.4957 16.0481 13.6001 16.0718 13.6996L17.1411 18.1823C17.4726 19.5719 15.9608 20.6702 14.7416 19.9256L10.8088 17.5234C10.7215 17.4701 10.6117 17.4701 10.5244 17.5234L6.59157 19.9256C5.37239 20.6702 3.86065 19.5719 4.19213 18.1823L5.26142 13.6996C5.28515 13.6001 5.25122 13.4957 5.17354 13.4291L1.67362 10.4311C0.588642 9.50168 1.16608 7.72453 2.59013 7.61036L7.18384 7.24209C7.28579 7.23391 7.37461 7.16939 7.41389 7.07495L9.18367 2.81987ZM10.9185 3.33191C10.8253 3.10789 10.5079 3.1079 10.4148 3.33191L8.64498 7.58699C8.41369 8.14307 7.89073 8.52303 7.29039 8.57115L2.69668 8.93943C2.45483 8.95882 2.35677 9.26063 2.54103 9.41846L6.04095 12.4165C6.49835 12.8083 6.6981 13.4231 6.55836 14.0089L5.48908 18.4916C5.43278 18.7276 5.68952 18.9141 5.89657 18.7877L9.82942 16.3855C10.3434 16.0716 10.9898 16.0716 11.5038 16.3855L15.4366 18.7877C15.6437 18.9141 15.9004 18.7276 15.8441 18.4916L14.7749 14.0089C14.6351 13.4231 14.8349 12.8083 15.2923 12.4165L18.7922 9.41846C18.9764 9.26062 18.8784 8.95882 18.6365 8.93943L14.0428 8.57115C13.4425 8.52303 12.9195 8.14307 12.6882 7.58699L10.9185 3.33191Z"
                      />
                    </svg>
                    <span>Button</span>
                    <svg
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.53427 5.45244C8.26062 5.73414 8.26714 6.18434 8.54884 6.45799L13.7275 11.4886L8.53447 16.83C8.26071 17.1116 8.26705 17.5618 8.54864 17.8356C8.83023 18.1093 9.28043 18.103 9.5542 17.8214L15.2431 11.97C15.3746 11.8347 15.447 11.6527 15.4443 11.4641C15.4416 11.2755 15.364 11.0957 15.2287 10.9642L9.53983 5.43786C9.25813 5.16421 8.80792 5.17073 8.53427 5.45244Z"
                      />
                    </svg>
                  </Button>
                ))}
              </div>
            ))}
          </div>
        ))}
      </section>
      <section>
        <div>
          <Checkbox />
          <Checkbox defaultChecked />
        </div>
        <div>
          <Checkbox disabled />
          <Checkbox disabled defaultChecked />
        </div>
        <div>
          <Switch />
          <Switch defaultChecked />
        </div>
        <div>
          <Switch disabled />
          <Switch disabled defaultChecked />
        </div>
      </section>
    </>
  );
}
