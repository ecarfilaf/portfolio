// Global variables for tooltips and interactions
let barData = null;
let pieData = null;
let radarData = null;

// Bar Chart Implementation
function drawBarChart() {
	const canvas = document.getElementById('barChart');
	const ctx = canvas.getContext('2d');

	// Data for two years - stacked values
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	barData = {
		thisYear: [44, 65, 15, 42, 48, 28, 44, 63, 60, 77, 50, 79], // Top section (lighter)
		lastYear: [76, 65, 45, 58, 62, 67, 54, 62, 60, 78, 45, 66]  // Bottom section (darker)
	};
	// Chart dimensions
	const padding = 40;
	const chartWidth = canvas.width - padding * 2;
	const chartHeight = canvas.height - padding * 2;
	const barWidth = 15; //chartWidth / months.length * 0.7;
	const barSpacing = chartWidth / months.length;

	// Colors - matching the image
	const colors = {
		thisYear: '#93c5fd',  // Lighter blue (top section)
		lastYear: '#3b82f6'   // Darker blue (bottom section)
	};
	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Find max total value for scaling
	const totalValues = months.map((_, i) => barData.thisYear[i] + barData.lastYear[i]);
	const maxValue = Math.max(...totalValues);
	const scale = chartHeight / (maxValue * 1.1);

	// Draw stacked bars
	months.forEach((month, index) => {
		const x = padding + index * barSpacing + (barSpacing - barWidth) / 2;
		const thisYearValue = barData.thisYear[index];
		const lastYearValue = barData.lastYear[index];
		const totalValue = thisYearValue + lastYearValue;

		// Bottom section (last year - darker blue)
		const bottomHeight = lastYearValue * scale;
		const bottomY = canvas.height - padding - bottomHeight;
		ctx.fillStyle = colors.lastYear;
		ctx.fillRect(x, bottomY, barWidth, bottomHeight);

		// Top section (this year - lighter blue)
		const topHeight = thisYearValue * scale;
		const topY = bottomY - topHeight;
		ctx.fillStyle = colors.thisYear;
		ctx.strokeStyle = colors.thisYear;
		ctx.beginPath();
		ctx.roundRect(x + 1, topY, barWidth - 2, topHeight, [50, 50, 0, 0]);
		ctx.stroke();
		ctx.fill();
	});

	// Draw month labels
	ctx.fillStyle = '#6b7280';
	ctx.font = '12px -apple-system, sans-serif';
	ctx.textAlign = 'center';

	months.forEach((month, index) => {
		const x = padding + index * barSpacing + barSpacing / 2;
		const y = canvas.height - padding + 20;
		ctx.fillText(month, x, y);
	});

	// Draw Y-axis labels
	ctx.textAlign = 'right';
	for (let i = 0; i <= 5; i++) {
		const value = Math.round((maxValue * i) / 5);
		const y = canvas.height - padding - (chartHeight * i) / 5;
		ctx.fillText(value.toString(), padding - 10, y + 4);
	}
}

// Pie Chart Implementation
function drawPieChart() {
	const canvas = document.getElementById('pieChart');
	const ctx = canvas.getContext('2d');

	// Data
	pieData = [
		{ label: 'Direct', value: 2602, color: '#3b82f6' },
		{ label: 'Affiliate', value: 1253, color: '#f59e0b' },
		{ label: 'E-mail', value: 541, color: '#ef4444' },
		{ label: 'Other', value: 1465, color: '#6b7280' }
	];

	const total = pieData.reduce((sum, item) => sum + item.value, 0);
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;
	const radius = Math.min(centerX, centerY) - 20;
	const innerRadius = radius * 0.6; // For donut chart effect

	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let currentAngle = -Math.PI / 2; // Start from top

	// Store segment positions for tooltip detection
	pieData.forEach(item => {
		const sliceAngle = (item.value / total) * 2 * Math.PI;

		item.startAngle = currentAngle;
		item.endAngle = currentAngle + sliceAngle;
		item.centerX = centerX;
		item.centerY = centerY;
		item.radius = radius;
		item.innerRadius = innerRadius;

		currentAngle += sliceAngle;
	});

	// Draw pie segments
	currentAngle = -Math.PI / 2;
	pieData.forEach(item => {
		const sliceAngle = (item.value / total) * 2 * Math.PI;

		// Draw outer arc
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
		ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
		ctx.closePath();
		ctx.fillStyle = item.color;
		ctx.fill();

		currentAngle += sliceAngle;
	});

	// Add subtle shadow effect
	ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
	ctx.shadowBlur = 10;
	ctx.shadowOffsetX = 2;
	ctx.shadowOffsetY = 2;

	// Redraw with shadow
	currentAngle = -Math.PI / 2;
	pieData.forEach(item => {
		const sliceAngle = (item.value / total) * 2 * Math.PI;

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
		ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
		ctx.closePath();
		ctx.fillStyle = item.color;
		ctx.fill();

		currentAngle += sliceAngle;
	});

	// Reset shadow
	ctx.shadowColor = 'transparent';
	ctx.shadowBlur = 0;
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
}

// Radar Chart Implementation
function drawRadarChart() {
	const canvas = document.getElementById('radarChart');
	const ctx = canvas.getContext('2d');

	// Data for interests
	radarData = [
		{ label: 'Technology', value: 75 },
		{ label: 'Sports', value: 60 },
		{ label: 'Media', value: 85 },
		{ label: 'Gaming', value: 45 },
		{ label: 'Arts', value: 30 }
	];

	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;
	const maxRadius = Math.min(centerX, centerY) - 60;
	const numLevels = 5;
	const numPoints = radarData.length;
	const angleStep = (Math.PI * 2) / numPoints;

	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw grid circles and radial lines
	ctx.strokeStyle = '#e5e7eb';
	ctx.lineWidth = 1;

	// Draw concentric circles
	for (let i = 1; i <= numLevels; i++) {
		const radius = (maxRadius / numLevels) * i;
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
		ctx.stroke();
	}

	// Draw radial lines and labels
	ctx.fillStyle = '#6b7280';
	ctx.font = '12px -apple-system, sans-serif';

	radarData.forEach((item, index) => {
		const angle = angleStep * index - Math.PI / 2;
		const x = centerX + Math.cos(angle) * maxRadius;
		const y = centerY + Math.sin(angle) * maxRadius;

		// Draw line
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(x, y);
		ctx.stroke();

		// Draw label
		const labelX = centerX + Math.cos(angle) * (maxRadius + 30);
		const labelY = centerY + Math.sin(angle) * (maxRadius + 30);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(item.label, labelX, labelY);

		// Store coordinates for tooltip detection
		item.angle = angle;
	});

	// Draw value labels (0, 20, 40, 60, 80)
	ctx.fillStyle = '#9ca3af';
	ctx.font = '10px -apple-system, sans-serif';
	ctx.textAlign = 'center';

	for (let i = 1; i <= numLevels; i++) {
		const value = (100 / numLevels) * i;
		const y = centerY - (maxRadius / numLevels) * i;
		ctx.fillText(value.toString(), centerX, y - 5);
	}

	// Calculate data points
	const dataPoints = radarData.map((item, index) => {
		const angle = angleStep * index - Math.PI / 2;
		const radius = (item.value / 100) * maxRadius;
		return {
			x: centerX + Math.cos(angle) * radius,
			y: centerY + Math.sin(angle) * radius,
			value: item.value,
			label: item.label
		};
	});

	// Draw filled area
	ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
	ctx.strokeStyle = '#3b82f6';
	ctx.lineWidth = 2;

	ctx.beginPath();
	dataPoints.forEach((point, index) => {
		if (index === 0) {
			ctx.moveTo(point.x, point.y);
		} else {
			ctx.lineTo(point.x, point.y);
		}
	});
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	// Draw data points (circles)
	dataPoints.forEach(point => {
		ctx.fillStyle = '#3b82f6';
		ctx.beginPath();
		ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
		ctx.fill();

		// White center
		ctx.fillStyle = 'white';
		ctx.beginPath();
		ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
		ctx.fill();
	});

	// Store data points for interaction
	radarData.forEach((item, index) => {
		item.x = dataPoints[index].x;
		item.y = dataPoints[index].y;
	});
}

// Tooltip functions
function showBarTooltip(x, y, month, year, value) {
	const tooltip = document.getElementById('barTooltip');
	tooltip.innerHTML = `${month}<br/>${year}: ${value}`;
	tooltip.style.left = x + 'px';
	tooltip.style.top = (y - 50) + 'px';
	tooltip.style.display = 'block';
}

function showPieTooltip(x, y, label, value, percentage) {
	const tooltip = document.getElementById('pieTooltip');
	tooltip.innerHTML = `${label}<br/>$${value.toLocaleString()} (${percentage}%)`;
	tooltip.style.left = x + 'px';
	tooltip.style.top = (y - 50) + 'px';
	tooltip.style.display = 'block';
}

function hideTooltip(tooltipId) {
	document.getElementById(tooltipId).style.display = 'none';
}

// Bar chart mouse events
function setupBarChartInteraction() {
	const canvas = document.getElementById('barChart');
	const rect = canvas.getBoundingClientRect();

	canvas.addEventListener('mousemove', (e) => {
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Chart dimensions
		const padding = 40;
		const chartWidth = canvas.width - padding * 2;
		const barWidth = chartWidth / 12 * 0.7;
		const barSpacing = chartWidth / 12;

		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		let found = false;

		months.forEach((month, index) => {
			const barX = padding + index * barSpacing + (barSpacing - barWidth) / 2;

			if (x >= barX && x <= barX + barWidth) {
				// Calculate which section was hovered
				const thisYearValue = barData.thisYear[index];
				const lastYearValue = barData.lastYear[index];
				const totalValue = thisYearValue + lastYearValue;
				const scale = (canvas.height - padding * 2) / (Math.max(...months.map((_, i) => barData.thisYear[i] + barData.lastYear[i])) * 1.1);

				const bottomHeight = lastYearValue * scale;
				const topHeight = thisYearValue * scale;
				const bottomY = canvas.height - padding - bottomHeight;
				const topY = bottomY - topHeight;

				if (y >= topY && y <= bottomY) {
					// Top section (this year)
					showBarTooltip(e.clientX - rect.left, e.clientY - rect.top, month, 'This year', thisYearValue);
					found = true;
				} else if (y >= bottomY && y <= canvas.height - padding) {
					// Bottom section (last year)
					showBarTooltip(e.clientX - rect.left, e.clientY - rect.top, month, 'Last year', lastYearValue);
					found = true;
				}
			}
		});

		if (!found) {
			hideTooltip('barTooltip');
		}
	});

	canvas.addEventListener('mouseleave', () => {
		hideTooltip('barTooltip');
	});
}

// Pie chart mouse events
function setupPieChartInteraction() {
	const canvas = document.getElementById('pieChart');
	const rect = canvas.getBoundingClientRect();

	canvas.addEventListener('mousemove', (e) => {
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Convert to canvas coordinates
		const canvasX = (x / rect.width) * canvas.width;
		const canvasY = (y / rect.height) * canvas.height;

		let found = false;
		const total = pieData.reduce((sum, item) => sum + item.value, 0);

		pieData.forEach(item => {
			const dx = canvasX - item.centerX;
			const dy = canvasY - item.centerY;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance >= item.innerRadius && distance <= item.radius) {
				let angle = Math.atan2(dy, dx);
				if (angle < 0) angle += 2 * Math.PI;
				angle += Math.PI / 2; // Adjust for starting position
				if (angle >= 2 * Math.PI) angle -= 2 * Math.PI;

				let startAngle = item.startAngle;
				let endAngle = item.endAngle;
				if (startAngle < 0) startAngle += 2 * Math.PI;
				if (endAngle < 0) endAngle += 2 * Math.PI;

				if ((startAngle <= endAngle && angle >= startAngle && angle <= endAngle) ||
					(startAngle > endAngle && (angle >= startAngle || angle <= endAngle))) {
					const percentage = Math.round((item.value / total) * 100);
					showPieTooltip(e.clientX - rect.left, e.clientY - rect.top, item.label, item.value, percentage);
					found = true;
				}
			}
		});

		if (!found) {
			hideTooltip('pieTooltip');
		}
	});

	canvas.addEventListener('mouseleave', () => {
		hideTooltip('pieTooltip');
	});
}

// Initialize charts when page loads
window.addEventListener('load', () => {
	drawBarChart();
	drawPieChart();
	drawRadarChart();
	setupBarChartInteraction();
	setupPieChartInteraction();
});

// Redraw on window resize
window.addEventListener('resize', () => {
	drawBarChart();
	drawPieChart();
	drawRadarChart();
});