import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import LoadingContainer from "../LoadingContainer";
import Compressor from "compressorjs";
import { getPosts } from "../../firebase/firebase_routes";

class TextEditEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      htmlContent: "",
      title: "",
      loading: false,
      relationshipBool: false,
      lifestyleBool: false,
      featuredBool: false,
      vlogBool: false,
      faithBool: false,
      arr: [],
    };
  }

  componentDidMount() {
    this.updateHtmlContent();
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.title !== this.state.title ||
      prevState.value !== this.state.value
    ) {
      this.updateHtmlContent();
    }
  }

  async loadData() {
    const { paramId } = this.props;
    try {
      const res = await getPosts();
      const post = res.find((dt) => dt.id === paramId);
      const allCategory = document.querySelectorAll(".category");

      if (post) {
        // Update state with the data from the fetched post
        this.setState({
          value: post.mainHTML,
          htmlContent: post.htmlContent,
          title: post.title,
        });

        let matchArr = [];

        Array.from(allCategory).forEach((ctg) => {
          post.category.filter((ct) => {
            if (ct === ctg.textContent) {
              matchArr.push(ct);
            }
          });
        });

        if (matchArr.length >= 1) {
          this.setState({
            arr: matchArr,
          });

          // Now, update formData.category with the new value
          this.props.setFormData({
            ...this.props.formData,
            category: matchArr,
          });

          const {
            vlogBool,
            faithBool,
            featuredBool,
            lifestyleBool,
            relationshipBool,
          } = this.state;

          matchArr.forEach((ctg) => {
            Array.from(allCategory).forEach((ctn) => {
              if (ctg === ctn.textContent) {
                if ("vlogBool".split("Bool").includes(ctg)) {
                  this.setState({ vlogBool: !vlogBool });
                }
                if ("faithBool".split("Bool").includes(ctg)) {
                  this.setState({ faithBool: !faithBool });
                }
                if ("featuredBool".split("Bool").includes(ctg)) {
                  this.setState({ featuredBool: !featuredBool });
                }
                if ("lifestyleBool".split("Bool").includes(ctg)) {
                  this.setState({ lifestyleBool: !lifestyleBool });
                }
                if ("relationshipBool".split("Bool").includes(ctg)) {
                  this.setState({ relationshipBool: !relationshipBool });
                }
              }
            });
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // ...rest of your code

  updateHtmlContent() {
    const { title, value } = this.state;
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");
    const anchorTags = doc.querySelectorAll("a");

    anchorTags.forEach((anchorTag) => {
      anchorTag.removeAttribute("style");
    });

    const htmlContent = doc.body.innerHTML;

    this.setState({ htmlContent });

    const { formData, setFormData } = this.props;
    const { arr } = this.state;

    setFormData({
      ...formData,
      category: arr,
    });

    if (title || value || arr) {
      console.log(arr, "d");
      setFormData({
        ...formData,
        title,
        content: htmlContent,
        value: this.removeHtmlTags(value),
        mainHTML: value,
        category: arr,
      });
    }
  }

  removeHtmlTags(input) {
    return input.replace(/<[^>]*>/g, "");
  }

  handleChange(html) {
    this.setState({ value: html });
  }

  addCategory(wrd, bool) {
    const { arr } = this.state;
    const { formData, setFormData } = this.props;
    console.log(arr, wrd);

    let updatedArr;

    if (bool) {
      // Use concat to create a new array with the added element
      updatedArr = arr.concat(wrd);
    } else {
      if (arr.includes(wrd)) {
        // Use filter to create a new array without the specified element
        updatedArr = arr.filter((a) => a !== wrd);
      } else {
        updatedArr = arr;
      }
    }

    this.setState({ arr: updatedArr }, () => {
      // Update formData.category with the new value
      setFormData({
        ...formData,
        category: updatedArr,
      });
    });
  }

  modules = {
    // #3 Add "image" to the toolbar
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    // # 4 Add module and upload function
    imageUploader: {
      upload: (file) => {
        if (!file) {
          return;
        }

        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          this.setState({ loading: true });

          fetch(
            "https://api.imgbb.com/1/upload?key=de1eba7a9b73b174dae8a2bb84f89500",
            {
              method: "POST",
              body: formData,
            }
          )
            .then((response) => response.json())
            .then((result) => {
              this.setState({ loading: false });
              resolve(result.data.url);
            })
            .catch((error) => {
              reject("Upload failed");
              console.error("Error:", error);
              this.setState({ loading: true });
            });
        });
      },
    },
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot", // #5 Optinal if using custom formats
  ];

  render() {
    const {
      value,
      htmlContent,
      title,
      loading,
      vlogBool,
      faithBool,
      featuredBool,
      lifestyleBool,
      relationshipBool,
      arr,
    } = this.state;

    const { formData, setFormData } = this.props;

    // const modules = {
    //   toolbar: [
    //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
    //     [{ font: [] }],
    //     [{ size: [] }],
    //     ["bold", "italic", "underline", "strike", "blockquote"],
    //     [
    //       { list: "ordered" },
    //       { list: "bullet" },
    //       { indent: "-1" },
    //       { indent: "+1" },
    //     ],
    //     ["link", "image", "video"],
    //   ],
    // };

    return (
      <div className="text-editor">
        <div className="editor">
          <div className="title">
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
            <div className="categories-container">
              <h2>Select Category</h2>
              <div className="categories">
                <div
                  className={`category ${relationshipBool && "active"}`}
                  onClick={() => {
                    this.setState(
                      { relationshipBool: !relationshipBool },
                      () => {
                        this.addCategory(
                          "relationship",
                          this.state.relationshipBool
                        );
                      }
                    );
                  }}
                >
                  relationship
                </div>
                <div
                  className={`category ${lifestyleBool && "active"}`}
                  onClick={() => {
                    this.setState({ lifestyleBool: !lifestyleBool }, () => {
                      this.addCategory("lifestyle", this.state.lifestyleBool);
                    });
                  }}
                >
                  lifestyle
                </div>
                <div
                  className={`category ${featuredBool && "active"}`}
                  onClick={() => {
                    this.setState({ featuredBool: !featuredBool }, () => {
                      this.addCategory("featured", this.state.featuredBool);
                    });
                  }}
                >
                  featured
                </div>
                <div
                  className={`category ${faithBool && "active"}`}
                  onClick={() => {
                    this.setState({ faithBool: !faithBool }, () => {
                      this.addCategory("faith", this.state.faithBool);
                    });
                  }}
                >
                  faith
                </div>
                <div
                  className={`category ${vlogBool && "active"}`}
                  onClick={() => {
                    this.setState({ vlogBool: !vlogBool }, () => {
                      this.addCategory("vlog", this.state.vlogBool);
                    });
                  }}
                >
                  vlog
                </div>
              </div>
            </div>
          </div>
          <ReactQuill
            className="quill-editor"
            theme="snow"
            value={value}
            onChange={(newValue) => this.setState({ value: newValue })}
            modules={this.modules}
            formats={this.formats}
          />
        </div>
        <div className="preview">
          <h1 className="title">{title}</h1>
          {loading ? (
            <LoadingContainer />
          ) : (
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default TextEditEditor;
