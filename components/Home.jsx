import React, { useEffect, useState } from "react";
import {
	Box,
	Image,
	Text,
	Button,
	Input,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

const quickLinkBoxCss = css`
	position: relative;
	width: 100px;
	height: 100px;
	boder: 1px soilid orange;
	float: left;
	margin-top: 30px;
	margin-right: 20px;
	cursor: pointer;
`;

const avatorCss = css`
	background-color: #eee;
	width: 50px;
	height: 50px;
	border-radius: 25px;
	overflow: hidden;

	margin: 0 auto;

	display: flex;
	justify-content: center;
	align-items: center;

	> img {
		width: 50%;
		height: 50%;
		object-fit: container;
	}
`;

const oneLineEllipsis = css`
	margin: 4px 0px;
	font-size: 12px;
	text-align: center;

	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const closeIcon = css`
	position: absolute;
	right: 0;
	top: 0;
`;

function QuckItem({ data, onDelete }) {
	const handleClick = () => {
		window.location.href = data.link;
	};

	return (
		<Box css={quickLinkBoxCss}>
			<Box
				css={closeIcon}
				padding="4px"
				onClick={onDelete.bind(null, data)}
			>
				<SmallCloseIcon />
			</Box>
			<Box css={{ ...avatorCss }} onClick={handleClick}>
				<Image src={data.icon} />
			</Box>
			<Text css={oneLineEllipsis}>{data.name}</Text>
		</Box>
	);
}

function QuckItemAdd({ data, onAdd }) {
	const { onOpen, onClose, isOpen } = useDisclosure();
	const toast = useToast();
	const firstFieldRef = React.useRef(null);
	const webNameRef = React.useRef(null);
	const webUrlRef = React.useRef(null);

	console.log(55);
	const showToast = (msg, position = "top", bgColor = "#eabe00") => {
		toast({
			position: position,
			render: () => (
				<Box color="white" p={3} bg={bgColor}>
					{msg}
				</Box>
			),
		});
	};

	function isUrl(url) {
		return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(
			url
		);
	}

	const addWebQucik = () => {
		// console.log(webNameRef, webUrlRef);
		let name = webNameRef && webNameRef.current && webNameRef.current.value;
		let url = webUrlRef && webUrlRef.current && webUrlRef.current.value;
		if (name && url) {
			if (isUrl(url)) {
				onAdd &&
					onAdd({
						name,
						url,
					});
				onClose();
			} else {
				showToast("网址格式不正确", "top", "#bd3638");
			}
		} else {
			showToast("请填写完整网址名字和网址");
		}
	};

	return (
		<Box css={quickLinkBoxCss}>
			<Popover
				isOpen={isOpen}
				initialFocusRef={firstFieldRef}
				onOpen={onOpen}
				onClose={onClose}
			>
				<PopoverTrigger>
					<Box>
						<Box css={{ ...avatorCss }}>
							<Image src={data.icon} />
						</Box>
						<Text css={oneLineEllipsis}>{data.name}</Text>
					</Box>
				</PopoverTrigger>
				<PopoverContent w="300px">
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverHeader>添加快捷方式</PopoverHeader>
					<PopoverBody>
						<Box>
							<Input
								placeholder="请输入网址名称"
								ref={webNameRef}
							/>
						</Box>
						<Box mt="20px">
							<Input placeholder="请输入网址" ref={webUrlRef} />
						</Box>
						<Box mt="20px">
							<Button mr="20px" onClick={addWebQucik}>
								确认
							</Button>
							<Button onClick={onClose}>取消</Button>
						</Box>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</Box>
	);
}

export default function Home({ defaultLinks=[]}) {
	const [quickLinkArray, setQuickLinkArray] = useState([]);

	useEffect(() => {
		let quickLinksStorage = window.localStorage.getItem("ql");
		if (quickLinksStorage) {
			quickLinksStorage = JSON.parse(quickLinksStorage);
		} else {
			window.localStorage.setItem("ql", JSON.stringify(defaultLinks));
			quickLinksStorage = defaultLinks;
		}
		setQuickLinkArray(quickLinksStorage);
	}, []);

	const getFaviconByWebUrl = (url) => {
		if (typeof document !== "undefined") {
			let a = document.createElement("a");
			a.href = url;
			let icon = a.protocol + "//" + a.hostname + "/favicon.ico";
			return icon;
		}
		return "";
	};

	const addQuickLink = (newLink) => {
		let icon = getFaviconByWebUrl(newLink.url);
		quickLinkArray.push({
			name: newLink.name,
			link: newLink.url,
			icon,
		});
		setQuickLinkArray([...quickLinkArray]);
		window.localStorage.setItem("ql", JSON.stringify(quickLinkArray));
	};

  const handleDelete = (target) => {
    const newList = quickLinkArray.filter(item => item.link !== target.link)
    setQuickLinkArray([...newList]);
		window.localStorage.setItem("ql", JSON.stringify(newList));
  };

	return (
		<div>
			<Box w="100%" h="100vh" overflow="hidden">
				<Box w="1200px" margin="0 auto">
					<Box
						w="100%"
						mt="180px"
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<Image
							// border="1px solid red"
							src="/images/google_img.png"
						/>
					</Box>

					<Box w="600px" margin="0 auto" mt="40px">
						{quickLinkArray.map((item) => {
							return (
								<QuckItem
									key={item.link}
									data={item}
									onDelete={handleDelete}
								/>
							);
						})}

						<QuckItemAdd
							data={{
								name: "添加快捷方式",
								link: "https://www.baidu.com/",
								icon: "/images/plus.png",
							}}
							onAdd={addQuickLink}
						/>
					</Box>
				</Box>
			</Box>
		</div>
	);
}
