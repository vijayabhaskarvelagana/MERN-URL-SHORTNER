// @author: Vijaya Bhaskar Velagana

import { useState } from "react";
import axios from "axios"; // axious is used to make HTTP requests to the backend API
import QRCode from "react-qr-code"; // react-qr-code is used to generate QR codes for the shortened URLs
import QRCodeGenerator from "qrcode"; // qrcode is used to generate QR code images for the shortened URLs

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
	const [url, setUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");
	const [copied, setCopied] = useState(false);
	const [qrImage, setQrImage] = useState("");

	const handleShorten = async () => {
		if(!url) return alert("Please enter a URL");
		try {
			const res = await axios.post(`${API_BASE_URL}/shorten`, { 
				originalUrl: url
			});

			const newShortUrl = res.data.shortUrl;
			setShortUrl(newShortUrl);
			setCopied(false);

			const qr = await QRCodeGenerator.toDataURL(newShortUrl);
			setQrImage(qr);

		} catch (error) {
			console.error("Error shortening URL:", error);
			alert("Failed to shorten URL. Please try again.");
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(shortUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
			<h1 className="text-4xl font-bold mb-6">MERN URL Shortener</h1>
			<div className="w-full max-w-md">
				<input
					type="text"
					placeholder="Enter URL to shorten"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					onClick={handleShorten}
					className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
				>
					Shorten URL
				</button>

				{shortUrl && (
					<div className="mt-6 p-4 border border-gray-300 rounded">
						<p className="text-lg mb-2">Shortened URL:</p>
						<div className="flex items-center justify-between">
							<a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">	{shortUrl}</a>
							<button
								onClick={handleCopy}
								className={`ml-4 px-3 py-1 rounded ${copied ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"} transition-colors`}
							>
								{copied ? "Copied!" : "Copy"}
							</button>
						</div>
						
						{qrImage && (
							<div className="mt-4">
								<p className="text-lg mb-2">QR Code:</p>
								<img src={qrImage} alt="QR Code" className="mx-auto" />
							</div>
						)}
						
						{qrImage && (<button
							onClick={() => {
								const link = document.createElement("a");
								link.href = qrImage;
								link.download = "qr-code.png";
								link.click();
							}}
							className="mt-3 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
						>
							Download QR Code
						</button>)}
						
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
